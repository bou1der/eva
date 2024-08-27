import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';

@Module({
  imports: [],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailerModule {}
