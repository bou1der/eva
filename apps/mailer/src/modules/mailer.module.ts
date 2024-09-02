import { EnvModule, EnvService } from '@config/global';
import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EnvModule],
      useFactory: async (config: EnvService) => ({
        transport: config.get('MAIL_SERVER'),
        defaults: {
          from: config.get('MAIL_FROM'),
        },
      }),
      inject: [EnvService],
    }),
  ],
  exports: [MailerModule],
})
export class MailerServer {}
