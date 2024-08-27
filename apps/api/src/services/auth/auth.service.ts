import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { type ReturnEventType } from '@type/service/auth';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientKafka,
    @Inject('MAIL_SERVICE') private readonly mailClient: ClientKafka,
  ) {}
  async RegisterUser(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('create-user');
    const user = this.client
      .send('create-user', JSON.stringify(dto))
      .subscribe((value) => {
        console.log(value);
        return value;
      });
    console.log(user);
  }
  getUser(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('get-user');
    const user = this.client
      .send(
        'signup' as ReturnEventType<'signup', 'pattern'>,
        JSON.stringify(dto),
      )
      .subscribe(async (value: ReturnEventType<'signup', 'output'>) => {
        console.log(await value);
        return value;
      });
    return user;
  }
  sendMail() {
    this.mailClient.emit('send-mail', JSON.stringify(''));
    this.mailClient.send('send-mail', JSON.stringify(''));
  }
}
