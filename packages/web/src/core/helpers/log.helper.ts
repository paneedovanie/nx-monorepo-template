import { isProduction } from '../constant';

export const log = (...args: any) => {
  if (isProduction) return;
  console.log(...args);
};
