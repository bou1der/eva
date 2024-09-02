import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@state/modules';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '~/libs/shared/src/lib/dto/users';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientKafka) {}

  async signup(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('signup');

    const res$ = this.client.send<any>('signup', JSON.stringify(dto));

    const res = await firstValueFrom(res$);
    console.log(res);
    return res;
  }
}
