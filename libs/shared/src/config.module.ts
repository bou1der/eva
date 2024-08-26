import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const GlobalEnv = process.env.NODE_GLOBAL_ENV;
const LocalEnv: string | undefined = process.env.NODE_LOCAL_ENV;

if (!GlobalEnv) {
  throw new Error(`Global ENV is ${GlobalEnv}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: LocalEnv ? [GlobalEnv, LocalEnv] : GlobalEnv,
      isGlobal: true,
    }),
  ],
})
export class EnvGlobalModule {}
