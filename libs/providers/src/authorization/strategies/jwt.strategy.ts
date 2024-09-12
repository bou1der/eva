import { ConfigService } from '@app/providers/config/config.service';
import { HttpRequestContext } from '@lib/dto';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly env: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: HttpRequestContext) => {
          return request.session.jwt.access;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: env.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
