import { Module } from '@nestjs/common';
import { JwtModule, MailerClientModule } from '@state/modules';
import { EnvModule } from '~/libs/shared/src/lib/config/config.module';
import { AppModule } from './app/app.module';
import { TypeOrmModule } from './modules/database.module';

@Module({
  imports: [EnvModule, JwtModule, TypeOrmModule, MailerClientModule, AppModule],
})
export class AppConfigModule {}
