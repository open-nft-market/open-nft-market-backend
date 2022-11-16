import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftsDropsService } from './nfts-drops.service';
import { NftsDropsRepository } from './nfts-drops.repository';
import { NftsDropsController } from './nfts-drops.controller';
import { NftsService } from '../nfts/nfts.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { NftRepository } from '../nfts/nfts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NftsDropsRepository, UsersRepository, NftRepository])],
  providers: [NftsDropsService, NftsService, UsersService],
  exports: [TypeOrmModule, NftsDropsService],
  controllers: [NftsDropsController],
})
export class NftsDropsModule {}
