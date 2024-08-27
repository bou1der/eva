import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MailService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  @EventPattern('send-mail')
  getHello() {
    console.log('mailer message pattern accept');
    this.mailerService.getHello();
  }
}
