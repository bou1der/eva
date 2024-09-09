import { Module } from '@nestjs/common';
import { MailingModule } from './app/mailer.module';
import { MailerServer } from './modules/mailer.module';

@Module({
  imports: [MailerServer, MailingModule],
  providers: [],
  controllers: [],
})
export class MailerConfigModule {}
