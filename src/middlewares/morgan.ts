import morgan from 'morgan';
import dayjs from 'dayjs';

export default () =>
  morgan((tokens, req: any, res: any): any => {
    const config = [
      '\n',
      `Origin: ${req?.headers?.origin || req?.headers?.referer},`,
      `IP Address: ${req.clientIp}`,
      dayjs().format('YYYY-MM-DD hh:mm:ss:SS'),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      '\n',
      '-'.repeat(20),
      `\nHeaders: ${JSON.stringify({
        ...req.headers,
        authorization: undefined,
      })}\n`,
      `query: ${JSON.stringify({
        ...(req.query || {}),
      })}\n`,
    ];

    return config.join(' ');
  });
