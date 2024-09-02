import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

const EnvEnums = z.enum([
  'KAFKA_BROKER',
  'API_GATEWAY_PORT',
  'AUTH_GROUP',
  'DATABASE_URL',
  'MAILER_GROUP',
  'MAIL_SERVER',
  'MAIL_FROM',
  'SERVER_HOST',
  'JWT_SECRET',
]);

export type Envs = z.infer<typeof EnvEnums>;

export class ConfigService {
  private readonly envConfig: { [key: string]: string } = null;
  envs: Envs[] = [
    'KAFKA_BROKER',
    'AUTH_GROUP',
    'API_GATEWAY_PORT',
    'DATABASE_URL',
    'MAILER_GROUP',
    'MAIL_SERVER',
    'MAIL_FROM',
    'SERVER_HOST',
    'JWT_SECRET',
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

const GlobalEnv = process.env.NODE_GLOBAL_ENV;

if (!GlobalEnv) {
  throw new Error(`Global ENV is ${GlobalEnv}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: GlobalEnv,
      isGlobal: true,
    }),
  ],
})
export class EnvGlobalModule {}
