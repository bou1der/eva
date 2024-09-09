import { EnvModule } from '@config/global';
import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';

@Module({
  imports: [EnvModule],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailingModule {}
