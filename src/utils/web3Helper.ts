import 'dotenv/config';
import Web3 from 'web3';
import dayjs from 'dayjs';

import { getSignerAddress } from './Cryptographer';
import { orderAndRemoveEmpty } from './Utils';
import { logger } from './logger';

export interface WebInitParams {
  web3: Web3;
  mintContractAddress: string;
  deployerAddress: string;
  chainId: number;
}

function initWeb3Instance(): WebInitParams {
  if (process.env.NODE_ENV !== 'production') {
    const mintContractAddress = (process.env.MINT_CONTRACT_ADDRESS_DEV as string).toLowerCase();
    const deployerAddress = (process.env.DEPLOYER_ADDRESS_DEV as string).toLowerCase();

    const nodeUrl = process.env.WEB3_NODE_RPC_DEV as string;
    const chainId = Number(process.env.CHAIN_ID_DEV as string);
    const web3 = new Web3(nodeUrl);
    return {
      mintContractAddress,
      web3,
      deployerAddress,
      chainId,
    };
  }

  const mintContractAddress = (process.env.MINT_CONTRACT_ADDRESS as string).toLowerCase();
  const deployerAddress = (process.env.DEPLOYER_ADDRESS as string).toLowerCase();

  const nodeUrl = process.env.WEB3_NODE_RPC as string;
  const chainId = Number(process.env.CHAIN_ID as string);
  const web3 = new Web3(nodeUrl);
  return {
    mintContractAddress,
    web3,
    deployerAddress,
    chainId,
  };
}

export class Web3Helper {
  private static lazyInit: WebInitParams;

  public static getWeb3(): WebInitParams {
    Web3Helper.lazyInit = Web3Helper.lazyInit || initWeb3Instance();
    return Web3Helper.lazyInit;
  }

  public static getAddressChecksum(address: string): string {
    return this.getWeb3().web3.utils.toChecksumAddress(address);
  }
}

export const validateWalletSignature = async ({
  data,
  walletAddress,
  signature,
  validateTimestamp = false,
}: {
  data: any;
  walletAddress: string;
  signature: string;
  validateTimestamp?: boolean;
}) => {
  const { web3 } = Web3Helper.getWeb3();

  const cleanedUpFields = JSON.stringify(
    orderAndRemoveEmpty({
      ...(data || {}),
      signature: undefined,
    }),
  );

  const hashedData = web3.utils.sha3(cleanedUpFields) as string;

  console.log('Signature data:', {
    data,
    signature,
    cleanedUpFields,
    hashedData,
  });

  const signerAddress = getSignerAddress(hashedData, signature);

  if (validateTimestamp && dayjs(data?.timestamp).isBefore(dayjs().subtract(2, 'minutes').format())) {
    logger.error('Replay attack prevention - old signature submitted (More than 2 minutes)', {
      data,
      signature,
      cleanedUpFields,
      hashedData,
    });
    return false;
  }

  return (
    signerAddress.toLowerCase() === walletAddress.toLowerCase() &&
    (signerAddress.toLowerCase() === data?.walletAddress?.toLowerCase() ||
      signerAddress.toLowerCase() === data?.creatorAddress?.toLowerCase())
  );
};
