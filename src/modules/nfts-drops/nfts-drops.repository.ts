import { EntityRepository, Repository } from 'typeorm';
import { NftDrop } from './nfts-drops.entity';

@EntityRepository(NftDrop)
export class NftsDropsRepository extends Repository<NftDrop> {}
