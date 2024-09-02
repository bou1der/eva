import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EnvService } from '~/libs/shared/src/lib/config';
import { verifyMail } from '~/libs/shared/src/lib/dto/send-mail.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly MailerService: MailerService,
    private readonly config: EnvService,
  ) {}
  getHello() {
    this.MailerService.sendMail({
      to: 'krowkin@bk.ru',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b>',
    });

    console.log('Mail send');
  }
  verify(dto: verifyMail) {
    console.log(dto);
    try {
      this.MailerService.sendMail({
        to: dto.email,
        subject: 'Test verify',
        from: `nir4y@yandex.ru`,
        text: 'лютый отсос',
        html: `<a>${this.config.get('SERVER_HOST')}/api/auth/signin${dto.token}</a>`,
      });
    } catch (error) {
      console.log(error);
    }
    console.log('Email is send?');
  }
}
