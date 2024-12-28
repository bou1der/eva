import { Inject, Injectable } from '@nestjs/common';
import { JwtService as JWT } from '@nestjs/jwt';
import { EXPIRES_JWT } from '@type/const';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtAccessService extends JWT {
  constructor(@Inject() private readonly env: ConfigService) {
    super({
      secret: env.get('JWT_SECRET'),
      signOptions: {
        expiresIn: EXPIRES_JWT,
      },
      verifyOptions: {
        maxAge: EXPIRES_JWT,
      },
    });
  }
}
