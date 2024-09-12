import { AuthAdapter } from '@app/adapters/provide/auth.adapter';
import { IHttpRequestContext } from '@lib/dto';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class JwtGuard implements CanActivate {
  constructor(private readonly adapter: AuthAdapter) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return false;

    const req = context.switchToHttp().getResponse<IHttpRequestContext>();

    const [bearer, access] = req.headers?.authorization.split(' ');

    if (bearer !== 'Bearer' && access === undefined) {
      throw new UnauthorizedException();
    }

    const session = await this.adapter.verify({ access });
    if (!session) throw new UnauthorizedException();

    req.session = session;
    return true;
  }
}
