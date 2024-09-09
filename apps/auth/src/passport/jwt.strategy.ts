import { EnvService } from '@config/global';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepoService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly env: EnvService,
    private readonly users: UserRepoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.get('JWT_SECRET'),
    });
  }

  async validate(verify: string) {
    console.log(verify + `<< In JWT strategy module`);

    // const verifyExist = await this.users.validate(verify);
    // if (!verifyExist) throw new UnauthorizedException('Ссылка недействительна');
    //
    // return verifyExist;
  }
}
