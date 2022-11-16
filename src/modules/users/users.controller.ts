import { Controller, Get, Param, Put, Body, BadRequestException, CacheTTL, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { isValidAddress } from 'src/utils/Utils';
import { UsersService } from './users.service';
import { UserUpdateProfileDto } from './users.dto';
import { Web3Helper } from '../../utils/web3Helper';
import { WalletSignatureGuard } from '../../guards/walletSignature.guard';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(WalletSignatureGuard)
  @Put('/profile')
  async updateProfile(@Body() userData: UserUpdateProfileDto) {
    const checksumAddress = Web3Helper.getAddressChecksum(userData.walletAddress);

    const foundUser = await this.userService.findByAddress(checksumAddress);

    if (userData.username && foundUser?.username?.toLocaleLowerCase() !== userData?.username?.toLocaleLowerCase()) {
      const newFoundUser = await this.userService.findByUsername(userData.username);

      if (newFoundUser && foundUser.walletAddress !== newFoundUser.walletAddress) {
        throw new BadRequestException(
          'Username is already taken: %{username} - %{address} Attempt',
          JSON.stringify({
            username: userData.username,
            address: userData.walletAddress,
          }),
        );
      }
    }

    if (userData.signature) {
      delete userData.signature;
    }

    await this.userService.updateById(foundUser.id, {
      username: userData?.username || foundUser?.username || null,
      userBio: userData?.userBio || foundUser?.userBio || null,
      avatarUrl: userData?.avatarUrl || foundUser?.avatarUrl || null,
      avatarUrlCompressed: userData?.avatarUrlCompressed || foundUser?.avatarUrlCompressed || null,
      avatarUrlThumbnail: userData?.avatarUrlThumbnail || foundUser?.avatarUrlThumbnail || null,
      coverUrl: userData?.coverUrl || foundUser?.coverUrl || null,
      coverThumbnailUrl: userData?.coverThumbnailUrl || foundUser?.coverThumbnailUrl || null,
      usernameLowercase: (userData?.username || foundUser?.username || '')?.toLocaleLowerCase(),
    });

    return {
      statusCode: 200,
    };
  }

  @CacheTTL(60)
  @Get('/:addressOrUsername')
  async getOne(@Param('addressOrUsername') addressOrUsername: string) {
    let user = await this.userService.findByAddress(addressOrUsername);

    if (!user) {
      if (!isValidAddress(addressOrUsername)) {
        throw new BadRequestException('The address or username is not valid');
      }
      user = await this.userService.saveNewUser({
        avatarUrl: '',
        userBio: '',
        username: '',
        walletAddress: addressOrUsername,
      });

      return {
        user,
      };
    }

    return {
      user,
    };
  }
}
