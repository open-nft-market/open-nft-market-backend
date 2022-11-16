import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Nft } from '../nfts/nfts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  walletAddress: string;

  @Column({ nullable: true, type: 'varchar' })
  username: string;

  @Column({ nullable: true, type: 'varchar' })
  usernameLowercase: string;

  @Column({ nullable: true, type: 'varchar' })
  avatarUrl: string;

  @Column({ nullable: true, type: 'varchar' })
  avatarUrlThumbnail: string;

  @Column({ nullable: true, type: 'varchar' })
  avatarUrlCompressed: string;

  @Column({ nullable: true, type: 'varchar' })
  coverUrl: string;

  @Column({ nullable: true, type: 'varchar' })
  coverThumbnailUrl: string;

  @Column({ nullable: true, type: 'varchar' })
  userBio: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  banned: boolean;

  @Column({ nullable: false, type: 'boolean', default: false })
  verified: boolean;

  @Column({ nullable: true, type: 'bool', default: true })
  active: boolean;

  @Column({ nullable: false, type: 'int4', default: 0 })
  salesCount: number;

  @Column({ nullable: false, type: 'int4', default: 0 })
  buysCount: number;

  @Column({ nullable: false, type: 'float8', default: 0.0 })
  buysTotalAmount: number;

  @Column({ nullable: false, type: 'bool', default: false })
  notAllowedToMint: boolean;

  @Column({ nullable: true, type: 'int4', default: 0 })
  nftsCount: number;

  @Column({ nullable: true, type: 'int4', default: 0 })
  nftsOwnCount: number;

  @Column({ nullable: false, type: 'float8', default: 0.0 })
  salesTotalAmount: number;

  @OneToMany(() => Nft, (nft: Nft) => nft.creator)
  public nftsCreated: Nft[];

  @OneToMany(() => Nft, (nft: Nft) => nft.owner)
  public nftsOwned: Nft[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date | string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date | string;
}
