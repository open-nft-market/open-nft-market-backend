import 'dotenv/config';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import dayjs from 'dayjs';
import { Nft } from '../nfts/nfts.entity';
import { User } from '../users/users.entity';

const { DROP_DEFAULT_ACTIVE_DURATION_DAYS } = process.env;
@Entity('nfts_drops')
export class NftDrop {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  dropID: string;

  @Column({ nullable: true, type: 'int8', default: null })
  creatorId: number;

  @Column({ nullable: true, type: 'varchar' })
  creatorAddress: string;

  @Column({ nullable: false, type: 'varchar' })
  title: string;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  @Column({ nullable: true, type: 'varchar' })
  imageUrl: string;

  @Column({ nullable: true, type: 'varchar' })
  imageUrlThumbnail: string;

  @Column({ nullable: true, type: 'varchar' })
  creationFeeTransactionHash: string;

  @Column({ nullable: true, type: 'bool', default: false })
  published: boolean;

  @Column({ nullable: true, type: 'bool', default: true })
  active: boolean;

  @Column({ nullable: true, type: 'int4', default: 1 })
  priority: number;

  @Column({ nullable: true, type: 'int4', default: 0 })
  nftTotalNumber: number;

  @Column({ nullable: true, type: 'int4', default: 0 })
  nftOwnerTotalNumber: number;

  @Column({ nullable: true, type: 'float8' })
  nftFloorPrice: number;

  @Column({ nullable: true, type: 'float8' })
  nftHighPrice: number;

  @Column({ nullable: true, type: 'float8' })
  nftTradedVolume: number;

  @Column({ nullable: true, type: 'bool', default: false })
  collection: boolean;

  @ManyToOne(() => User, (creator: User) => creator.nftsCreated)
  @JoinColumn()
  creator: Partial<User>;

  @OneToMany(() => Nft, (nft: Nft) => nft.drop)
  public nfts: Nft[];

  @Column({
    nullable: true,
    type: 'timestamptz',
    default: dayjs().add(Number(DROP_DEFAULT_ACTIVE_DURATION_DAYS), 'days').format(),
  })
  deactivatedAt: Date | string;

  @CreateDateColumn({
    default: () => new Date(),
  })
  createdAt: Date | string;

  @UpdateDateColumn({
    default: () => new Date(),
  })
  updatedAt: Date | string;
}
