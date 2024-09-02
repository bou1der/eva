import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { verifyMail } from '~/libs/shared/src/lib/dto/send-mail.dto';
import { MailService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  @EventPattern('send-mail')
  getHello() {
    console.log('mailer message pattern accept');
    this.mailerService.getHello();
  }

  @EventPattern('verify')
  verifyMail(@Payload(ValidationPipe) dto: verifyMail) {
    this.mailerService.verify(dto);
  }
}
