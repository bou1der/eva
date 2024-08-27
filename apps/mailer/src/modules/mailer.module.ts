import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import ConfigService from '~/libs/shared/src/lib/config';

const Config = new ConfigService();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        url: Config.get('MAIL_SERVER'),
        port: 587,
      },
      defaults: {
        from: `${Config.get('MAIL_FROM')}`,
      },
      options: {
        global: true,
      },
    }),
  ],
})
export class MailerServer {}
