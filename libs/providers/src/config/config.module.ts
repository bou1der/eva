import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { ConfigService } from './config.service';
import { EnvSchema } from './config.types';

const globalEnv = process.env.NODE_GLOBAL_ENV;
if (!globalEnv) {
  throw new Error('global env is not setup');
}
@Module({
  imports: [
    Config.forRoot({
      envFilePath: globalEnv,
      validate: (env) => EnvSchema.parse(env),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
