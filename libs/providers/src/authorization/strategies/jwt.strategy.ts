import { ConfigService } from '@app/providers/config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly env: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      ignoreExpiration: false,
      secretOrKey: env.get('JWT_SECRET'),
    });
  }

  async validate() {}
}
