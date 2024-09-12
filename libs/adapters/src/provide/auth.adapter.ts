import { AUTH_SERVICE } from '@app/adapters/auth.adapter.module';
import { DefaultSession, JwtTransferDto } from '@lib/dto';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class AuthAdapter {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientKafka) {}

  async verify(dto: JwtTransferDto): Promise<DefaultSession | undefined> {
    this.client.subscribeToResponseOf({ cmd: 'verify' });
    const res$ = this.client.send<DefaultSession | undefined>(
      { cmd: 'verify' },
      JSON.stringify(dto),
    );

    const res = await firstValueFrom<undefined | DefaultSession>(res$);

    return res;
  }
}
