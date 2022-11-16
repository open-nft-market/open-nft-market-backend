import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { NftsDropsService } from '../nfts-drops/nfts-drops.service';
import { NftsDropsRepository } from '../nfts-drops/nfts-drops.repository';
import { NftRepository } from './nfts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, NftsDropsRepository, NftRepository])],
  providers: [NftsService, UsersService, NftsDropsService],
  exports: [TypeOrmModule, NftsService],
  controllers: [NftsController],
})
export class NftsModule {}
