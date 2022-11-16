import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDropDto {
  @IsString()
  creationFeeTransactionHash: string;

  @IsNumber()
  creatorId: number;

  @IsString()
  creatorAddress: string;

  @IsString()
  creatorUsername: string;

  @IsString()
  description: string;

  @IsString()
  dropID: string;

  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imageUrlThumbnail?: string;

  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  collection?: boolean;
}
