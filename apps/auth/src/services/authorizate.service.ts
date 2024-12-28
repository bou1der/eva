import { UserCoreAuthorizate } from '@app/domain/user/user.core.authorizate';
import { JwtAccessService } from '@app/providers/authenticate/jwt.service';
import { EmailVerifyService } from '@app/providers/email-verify/email.verify.service';
import { CreateUserDto, VerifyDto } from '@lib/dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthorizateService {
  constructor(
    private readonly emailService: EmailVerifyService,
    private readonly userCore: UserCoreAuthorizate,
    private readonly jwtService: JwtAccessService,
  ) {}
  async signup(dto: CreateUserDto) {
    return await this.emailService.sign(dto.email);
  }

  async signin(dto: VerifyDto) {
    const verify = await this.emailService.verify(dto.token);
    if (!verify) {
      throw new UnauthorizedException();
    }

    const user = await this.userCore.regUser({ email: verify.email });

    console.log(user);
    const jwt = await this.jwtService.signAsync({ ...user });
    console.log(jwt);

    return jwt;
  }
}
