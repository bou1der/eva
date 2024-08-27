import { Module } from '@nestjs/common';
import { EnvGlobalModule } from '~/libs/shared/src/config.module';
import { MailerModule } from './app/mailer.module';
import { MailerServer } from './modules/mailer.module';

@Module({
  imports: [EnvGlobalModule, MailerServer, MailerModule],
  providers: [],
  controllers: [],
})
export class MailerConfigModule {}
