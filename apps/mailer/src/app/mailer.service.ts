import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from '@shared/dto';
import { EnvService } from '~/libs/shared/src/lib/config';

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
  sendVerifyMail(dto: SendMailDto) {
    console.log(dto);
    try {
      this.MailerService.sendMail({
        to: dto.email,
        subject: 'Test verify',
        from: `nir4y@yandex.ru`,
        text: 'лютый отсос',
        html: `<a>${this.config.get('SERVER_HOST')}/api/auth/verify${dto.token}</a>`,
      });
    } catch (error) {
      console.log(error);
    }
    console.log('Email is send?');
  }
}
