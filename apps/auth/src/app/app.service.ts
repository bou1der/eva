import { CreateUserDto } from '@nest/user/dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { MAILER_SERVICE } from '@state/modules';
import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { UserEntity } from '~/libs/shared/src/lib/entities/user.entity';
import { VerificationEntity } from '~/libs/shared/src/lib/entities/verification.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly db: DataSource,
    private readonly jwt: JwtService,
    @Inject(MAILER_SERVICE) private readonly mailer: ClientKafka,
  ) {}

  async signup(dto: CreateUserDto) {
    const VerificationRepo = this.db.getRepository(VerificationEntity);
    const UserRepo = this.db.getRepository(UserEntity);
    const existUser = await UserRepo.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('Пользователь уже существует');
    }

    const verifyToken = crypto.randomBytes(32).toString('hex');

    const verify = VerificationRepo.create();
    verify.token = verifyToken;
    verify.identifier = dto.email;
    VerificationRepo.save(verify);

    this.mailer.emit(
      'verify',
      JSON.stringify({
        email: verify.identifier,
        token: verifyToken,
      }),
    );
  }

  async signin(dto: CreateUserDto) {
    const db = this.db.getRepository(UserEntity);
    const existUser = await db.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!existUser) {
      throw new BadRequestException('Аккаунт ненайден');
    }

    const token = await this.signToken({
      id: existUser.id,
      email: existUser.email,
    });
    console.log(token);

    return 'success';
  }
  signout() {}

  async signToken(args: { id: string; email: string }) {
    const payload = args;

    return await this.jwt.signAsync(payload);
  }
}
