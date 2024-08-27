import { z } from 'zod';

const EnvEnums = z.enum([
  'KAFKA_BROKER',
  'API_GATEWAY_PORT',
  'AUTH_CLIENT',
  'AUTH_GROUP',
  'SIMPLE_CLIENT',
  'SIMPLE_GROUP',
  'DATABASE_URL',
  'MAILER_CLIENT',
  'MAILER_GROUP',
  'MAIL_SERVER',
  'MAIL_FROM',
]);

export type Envs = z.infer<typeof EnvEnums>;

export default class ConfigService {
  private readonly envConfig: { [key: string]: string } = null;
  envs: Envs[] = [
    'KAFKA_BROKER',
    'AUTH_GROUP',
    'AUTH_CLIENT',
    'API_GATEWAY_PORT',
    'SIMPLE_CLIENT',
    'SIMPLE_GROUP',
    'DATABASE_URL',
    'MAILER_CLIENT',
    'MAILER_GROUP',
    'MAIL_SERVER',
    'MAIL_FROM',
  ];
  constructor() {
    this.envConfig = {};
    this.envs.map((env) => {
      if (!process.env[env]) {
        // TODO Сделать разделение с локальными переменными
        // throw new Error(`Env variable ${env} is ${process.env[env]}`);
        console.log(`Env variable ${env} is ${process.env[env]}`);
      }
      this.envConfig[env] = process.env[env];
    });
  }
  get(key: Envs): string {
    return this.envConfig[key];
  }
}
