import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private readonly MailerService: MailerService) {}
  getHello() {
    this.MailerService.sendMail({
      to: 'krowkin@bk.ru',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b>',
    });

    console.log('Mail send');
  }
}
