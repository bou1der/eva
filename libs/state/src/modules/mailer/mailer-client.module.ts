import { Module } from '@nestjs/common';
import { MailerTransportService } from './mailer-client.service';
import { MailerTransport } from './mailer.transport';

@Module({
  imports: [MailerTransport],
  providers: [MailerTransportService],
  exports: [MailerTransportService],
})
export class MailerClientModule {}
