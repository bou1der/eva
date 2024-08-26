import { Module } from '@nestjs/common';
import { EnvGlobalModule } from '~/libs/shared/src/config.module';
import { AuthModule } from './app/auth.module';
import { TypeOrmModule } from './modules/database.module';

@Module({
  imports: [EnvGlobalModule, TypeOrmModule, AuthModule],
})
export class AppConfigModule {}
