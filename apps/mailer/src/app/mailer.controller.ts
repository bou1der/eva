import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendMailDto } from '@shared/dto';
import { MailService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  @EventPattern('send-verify-mail')
  sendVerifyMail(@Payload(ValidationPipe) dto: SendMailDto) {
    this.mailerService.sendVerifyMail(dto);
  }
}
