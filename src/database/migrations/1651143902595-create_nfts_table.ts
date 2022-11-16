import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNftsTable1651143902595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                    -- Table Definition
                    CREATE TABLE "nfts" (
                        "id" BIGSERIAL PRIMARY KEY,
                        "userId" int8,
                        "tokenUri" varchar NOT NULL,
                        "tokenID" int8 UNIQUE,
                        "ownerAddress" varchar NOT NULL,
                        "ownerId" int8,
                        "creatorAddress" varchar NOT NULL,
                        "creatorId" int8,
                        "dropId" int8,
                        "name" varchar NOT NULL,
                        "description" varchar NOT NULL,
                        "fileSize" float4 DEFAULT 0.0,
                        "fileType" varchar,
                        "listed" bool DEFAULT false,
                        "listedOnChain" bool DEFAULT false,
                        "verified" bool DEFAULT false,
                        "isVideo" bool DEFAULT false,
                        "image" varchar,
                        "url" varchar,
                        "urlCompressed" varchar,
                        "urlThumbnail" varchar,
                        "mintTransactionHash" varchar,
                        "price" float8,
                        "active" bool DEFAULT true,
                        "priority" int4,
                        "createdAt" timestamptz NOT NULL DEFAULT now(),
                        "updatedAt" timestamptz NOT NULL DEFAULT now()
                    );
                `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "nfts";', undefined);
  }
}
