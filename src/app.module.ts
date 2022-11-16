import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

import { NftsModule } from './modules/nfts/nfts.module';
import { UsersService } from './modules/users/users.service';
import { NftsDropsModule } from './modules/nfts-drops/nfts-drops.module';

const providers: any = [AppService, UsersService];

if (process.env.NODE_ENV === 'production') {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  });
}

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        NODE_ENV: Joi.string().default('development'),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    NftsModule,
    NftsDropsModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
