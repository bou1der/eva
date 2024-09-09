import { MailerTransportService } from '@app/state/modules/mailer/mailer-client.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, JwtDto } from '@shared/dto';
import { UserRepoService } from './users/users.service';
import { VerifyService } from './users/verify.service';

@Injectable()
export class AppService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserRepoService,
    private readonly verifyService: VerifyService,
    private readonly mailer: MailerTransportService,
  ) {}

  async signup(dto: CreateUserDto) {
    const newVerify = await this.verifyService.create(dto.email);
    this.mailer.sendVerifyMail({
      email: newVerify.identifier,
      token: newVerify.token,
    });
  }

  async signin(token: string) {
    const existToken = await this.verifyService.sign(token);

    const user = await this.userService.create({
      email: existToken.identifier,
    });

    return token;
  }

  async refresh(dto: JwtDto) {}

  // async validateEmail(dto: VerifyUserDto) {
  //   const verify = await this.userService.findVerifyToken(dto.token);
  //
  //   if (!verify) throw new RpcException('Ссылка недействительна');
  //   const existUser = await this.userService.findOne(verify.identifier);
  //
  //   if (
  //     !existUser ||
  //     !existUser.accounts.find((account) => account.provider === 'email')
  //   ) {
  //     return await this.userService.create({ email: verify.identifier });
  //   }
  //
  //   return 200;
  // }
}
