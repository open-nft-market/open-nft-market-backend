import { Logger } from '@nestjs/common';

const whitelistProd = [/\S+.airnfts.com(\/)?/];

const whitelistStaging = [/\S+.airnfts.com(\/)?/, /\S+blitzscale.vercel.app(\/)?/, /localhost:3000(\/)?/];

const isProd = process.env.NODE_ENV === 'production';

const corsOrigin = (origin, callback) => {
  if (!origin) {
    return callback(null, true);
  }
  const whitelist = isProd ? whitelistProd : whitelistStaging;

  if (whitelist.some((host) => host.test(origin))) {
    Logger.log('allowed cors for:', origin);
    return callback(null, true);
  }
  Logger.error('blocked cors for:', origin);
  return callback(new Error('Not allowed by CORS'));
};

export default corsOrigin;
