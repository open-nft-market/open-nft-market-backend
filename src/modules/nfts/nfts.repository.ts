import { EntityRepository, Repository } from 'typeorm';
import { Nft } from './nfts.entity';

@EntityRepository(Nft)
export class NftRepository extends Repository<Nft> {}
