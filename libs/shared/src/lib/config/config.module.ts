import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './config.service';
import { EnvSchema } from './config.types';

const GlobalEnv = process.env.NODE_GLOBAL_ENV;
const LocalEnv: string | undefined = process.env.NODE_LOCAL_ENV;

if (!GlobalEnv) {
  throw new Error(`Global ENV is ${GlobalEnv}`);
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: LocalEnv ? [GlobalEnv, LocalEnv] : GlobalEnv,
      validate: (env) => EnvSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: EnvService,
      useClass: EnvService,
    },
  ],
  exports: [EnvService],
})
export class EnvModule {}
