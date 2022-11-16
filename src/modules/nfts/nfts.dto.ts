import { IsNumber, IsString, IsOptional } from 'class-validator';

export class NftGetAllQuery {
  @IsNumber()
  @IsOptional()
  limit?: number = 10;

  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsString()
  @IsOptional()
  sortOrder?: string;

  @IsString()
  @IsOptional()
  walletAddress?: string;
}

export class CreateNFTDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  oldDropID: string;

  @IsNumber()
  @IsOptional()
  dropId: number;

  @IsString()
  tokenUri: string;

  @IsString()
  description: string;

  @IsNumber()
  fileSize: number;

  @IsString()
  fileType: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  ownerAddress: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  @IsOptional()
  urlCompressed?: string;

  @IsString()
  @IsOptional()
  urlMedium?: string;

  @IsString()
  @IsOptional()
  urlThumbnail?: string;
}
export class UpdateNftTokenDto {
  @IsString()
  @IsOptional()
  tokenUri: string;

  @IsString()
  tokenID: string;

  @IsString()
  mintTransactionHash: string;
}
