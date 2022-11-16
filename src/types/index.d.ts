import Polyglot from 'node-polyglot';

declare let Web3: any;
declare let web3;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'test' | 'development' | 'production' | 'staging';
      readonly PORT?: string;
      readonly PWD: string;
      readonly DATABASE_URL: string;
      readonly DATABASE_URL_DEV: string;
      readonly DATABASE_URL_TEST: string;
      readonly MIXPANEL_PROJECT_TOKEN: string;
    }

    interface Error {
      status?: number;
    }
  }

  namespace Express {
    interface Request {
      clientIp?: string;
      polyglot: Polyglot;
    }
  }

  interface ResponseError extends Error {
    status?: number;
  }
}

export {};
