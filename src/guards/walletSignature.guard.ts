import 'dotenv/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Web3Helper, validateWalletSignature } from '../utils/web3Helper';
import { UsersRepository } from '../modules/users/users.repository';
import { logger } from '../utils/logger';

const LOG_NAME = 'USER ACTION';
@Injectable()
export class WalletSignatureGuard implements CanActivate {
  constructor(private reflector: Reflector, private userRepo: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const signature = req.body.signature || req.headers.signature;
    const walletAddress =
      req.body.walletAddress || req.body.creatorAddress || Web3Helper.getAddressChecksum(req.headers.address as string);
    const data = req.body;
    if (!signature) {
      return false;
    }

    if (
      !(await validateWalletSignature({
        signature,
        walletAddress,
        data,
        validateTimestamp: true,
      }))
    ) {
      logger.error(LOG_NAME, 'signature failed', {
        data,
      });
      return false;
    }

    const foundUser = await this.userRepo.findOne({
      where: {
        walletAddress,
      },
    });

    if (!foundUser) {
      logger.error(LOG_NAME, 'user not found', {
        data,
      });
      return false;
    }

    return true;
  }
}
