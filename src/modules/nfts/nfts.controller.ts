import { Controller, Post, Body, BadRequestException, Param, Get, CacheTTL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NftsService } from './nfts.service';
import { CreateNFTDto, NftGetAllQuery } from './nfts.dto';

import { UsersService } from '../users/users.service';
import { NftsDropsService } from '../nfts-drops/nfts-drops.service';

@ApiTags('nfts')
@Controller('nfts')
export class NftsController {
  constructor(
    private readonly nftService: NftsService,
    private readonly userService: UsersService,
    public readonly dropService: NftsDropsService,
  ) {}

  @CacheTTL(60)
  @Get('/')
  async getAll(@Param() params: NftGetAllQuery) {
    return await this.nftService.findFeed(params);
  }

  @Post('/')
  async createNft(@Body() nftData: CreateNFTDto) {
    const nftCreator = await this.userService.findByAddress(nftData.ownerAddress);

    if (!nftCreator || nftCreator.notAllowedToMint) {
      throw new BadRequestException('User not allowed to mint NFTs');
    }

    if (nftData.oldDropID) {
      const foundDrop = await this.dropService.findOneByDropID(nftData.oldDropID);

      if (!foundDrop) {
        throw new BadRequestException('failed to load all drop');
      }

      nftData.dropId = foundDrop.id;
    }
    const nft = await this.nftService.save({
      ...nftData,
    });

    return {
      message: 'Nft created successfully',
      nft,
    };
  }

  @CacheTTL(60)
  @Get('/:tokenUri/tokenUri')
  async getNftByTokenUri(@Param('tokenUri') tokenUri: string) {
    const nft = await this.nftService.findByTokenUri(tokenUri);

    return {
      nft,
    };
  }
}
