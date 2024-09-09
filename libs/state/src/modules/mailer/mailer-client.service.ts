import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SendMailDto } from '@shared/dto';
import { MAILER_SERVICE } from './mailer.transport';

@Injectable()
export class MailerTransportService {
  constructor(@Inject(MAILER_SERVICE) private readonly mailer: ClientKafka) {}
  async sendVerifyMail(dto: SendMailDto) {
    this.mailer.emit('send-verify-mail', JSON.stringify(dto));
  }
}
