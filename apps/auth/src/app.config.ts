import { Module } from '@nestjs/common';
import { EnvGlobalModule } from '~/libs/shared/src/config.module';
import { AppModule } from './app/app.module';
import { TypeOrmModule } from './modules/database.module';

@Module({
  imports: [EnvGlobalModule, TypeOrmModule, AppModule],
})
export class AppConfigModule {}
