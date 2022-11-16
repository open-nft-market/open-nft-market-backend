import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNftsDrop1653602182632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
              -- Table Definition
              CREATE TABLE "nfts_drops" (
                  "id" BIGSERIAL PRIMARY KEY,
                  "dropID" varchar NOT NULL,
                  "creatorId" int8,
                  "creationFeeTransactionHash" varchar,
                  "creatorUsername" varchar,
                  "creatorAddress" varchar,
                  "title" varchar NOT NULL,
                  "description" varchar,
                  "imageUrl" varchar,
                  "imageUrlThumbnail" varchar,
                  "published" boolean DEFAULT false,
                  "active" boolean DEFAULT false,
                  "collection" boolean DEFAULT false,
                  "priority" int4 DEFAULT 1,
                  "nftTotalNumber" int4 DEFAULT 0,
                  "nftOwnerTotalNumber" int4 DEFAULT 0,
                  "nftFloorPrice" int4 DEFAULT 0,
                  "nftHighPrice" int4 DEFAULT 0,
                  "nftTradedVolume" int4 DEFAULT 0,
                  "deactivatedAt" timestamptz,
                  "createdAt" timestamptz NOT NULL DEFAULT now(),
                  "updatedAt" timestamptz NOT NULL DEFAULT now()
              );
          `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "nfts_drops";', undefined);
  }
}
