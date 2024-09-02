import { EnvEnum } from './config.types';

export function upConfig(key: EnvEnum) {
  const envExist = process.env[key];
  if (!envExist) {
    throw new Error(`ENV ${key} is ${envExist}`);
  }
  return envExist;
}
