import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1651143888123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                  -- Table Definition
                  CREATE TABLE "users" (
                    "id" BIGSERIAL PRIMARY KEY,
                    "walletAddress" varchar NOT NULL UNIQUE,
                    "username" varchar,
                    "usernameLowercase" varchar,
                    "avatarUrl" varchar,
                    "avatarUrlThumbnail" varchar,
                    "avatarUrlCompressed" varchar,
                    "coverUrl" varchar,
                    "coverThumbnailUrl" varchar,
                    "userBio" varchar,
                    "nftsCount" int4 DEFAULT 0,
                    "buysCount" int4 DEFAULT 0,
                    "salesCount" int4 DEFAULT 0,
                    "nftsOwnCount" int4 DEFAULT 0,
                    "buysTotalAmount" float8 DEFAULT 0,
                    "salesTotalAmount" float8 DEFAULT 0,
                    "banned" bool DEFAULT false,
                    "active" bool DEFAULT true,
                    "verified" bool DEFAULT false,
                    "notAllowedToMint" bool DEFAULT false,
                    "createdAt" timestamptz NOT NULL DEFAULT now(),
                    "updatedAt" timestamptz NOT NULL DEFAULT now()
                  );
                `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users";', undefined);
  }
}
