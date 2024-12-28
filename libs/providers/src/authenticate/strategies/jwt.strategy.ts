import { ConfigService } from '@app/providers/config/config.service';
import { IHttpRequestContext } from '@lib/dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly env: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: IHttpRequestContext) => {
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
