import {
  CreateUserDto,
  DefaultSession,
  JwtTransferDto,
  VerifyDto,
} from '@lib/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from './auth.kafka';

@Injectable()
export class AuthAdapter {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientKafka) {}

  async signup(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('signup');
    const res = await firstValueFrom(
      this.client.send('signup', JSON.stringify(dto)),
    );
    this.client.close();
    return res;
  }

  async signin(dto: VerifyDto) {
    this.client.subscribeToResponseOf('signin');
    const res = await firstValueFrom(
      this.client.send('signin', JSON.stringify(dto)),
    );
    this.client.close();
    return res;
  }

  async verify(dto: JwtTransferDto): Promise<DefaultSession | undefined> {
    this.client.subscribeToResponseOf('verify');
    const res$ = this.client.send<DefaultSession | undefined>(
      'verify',
      JSON.stringify(dto),
    );

    const res = await firstValueFrom<undefined | DefaultSession>(res$);

    return res;
  }
}
