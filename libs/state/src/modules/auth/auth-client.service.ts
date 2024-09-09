import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto, JwtDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from './auth.transport';

@Injectable()
export class AuthTransportService {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientKafka) {}
  async signup(dto: CreateUserDto) {
    this.client.subscribeToResponseOf('signup');
    const res$ = this.client.send<null>('signup', JSON.stringify(dto));
    const res = await firstValueFrom(res$);
    return res;
  }

  async signin(token: string) {
    this.client.subscribeToResponseOf('signin');
    const res$ = this.client.send('signin', JSON.stringify(token));
    const res = await firstValueFrom(res$);
    return res;
  }

  async refresh(jwt: JwtDto) {
    this.client.subscribeToResponseOf('refresh');
    const res = await firstValueFrom(
      this.client.send<JwtDto>('refresh', JSON.stringify(jwt)),
    );
    return res;
  }

  async logout() {
    this.client.subscribeToResponseOf('logout');
    const res = await firstValueFrom(
      this.client.send('logout', JSON.stringify({})),
    );

    return res;
  }
}
