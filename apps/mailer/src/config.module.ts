import { EnvModule } from '@config/global';
import { Module } from '@nestjs/common';
import { MailingModule } from './app/mailer.module';
import { MailerServer } from './modules/mailer.module';

@Module({
  imports: [EnvModule, MailerServer, MailingModule],
  providers: [],
  controllers: [],
})
export class MailerConfigModule {}
