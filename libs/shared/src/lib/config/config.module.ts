import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './config.service';
import { EnvSchema } from './config.types';

const GlobalEnv = process.env.NODE_GLOBAL_ENV;

if (!GlobalEnv) {
  throw new Error(`Global ENV is ${GlobalEnv}`);
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: GlobalEnv,
      validate: (env) => EnvSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
