import { AuthTransportService } from '@app/state/modules/auth/auth-client.service';
import { AUTH_SERVICE } from '@app/state/modules/auth/auth.transport';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEntity } from '@shared/entities';
import { firstValueFrom } from 'rxjs';
// import { AUTH_SERVICE } from '@state/modules';

export class JwtGuard implements CanActivate {
  constructor(
    private readonly AuthTransport: AuthTransportService,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientKafka,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    switch (context.getType()) {
      case 'http': {
        const request = context.switchToHttp().getRequest<Request>();
        const res$ = this.authClient.send<UserEntity | null>('status', '');
        const res = await firstValueFrom(res$);

        if (!res) throw new UnauthorizedException();

        console.log(res);
        return true;

        return true;
      }
    }
  }
}
