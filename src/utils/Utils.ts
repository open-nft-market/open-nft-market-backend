import dayjs from 'dayjs';
import slugify from 'slugify';

export function orderObjectProps(obj: any): any {
  return Object.entries(obj)
    .sort()
    .reduce((o: any, [k, v]) => ((o[k] = v), o), {});
}
export function removeEmpty(obj: any): any {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined || obj[k] === '' || obj[k] === null) {
      delete obj[k];
    }
  });
  return obj;
}

export function orderAndRemoveEmpty(obj: unknown): unknown {
  return orderObjectProps(removeEmpty(obj));
}

export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function isValidAddress(address: string): boolean {
  return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
}

export const truncate = (str: string, max: number) => {
  if (!str) {
    return '';
  }
  return str.length > max ? `${str.substr(0, max - 1)}...` : str;
};

export const convertToSlug = (text: string) =>
  text
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '_')
    .replace('__', '_');

export const stringSlugify = (text: string): string => `${slugify(text)}-${dayjs().unix()}`;
