import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';
import { UserEntity } from '~/libs/shared/src/lib/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly db: DataSource) {}

  async signup(dto: CreateUserDto) {
    const UsersRepo = this.db.getRepository(UserEntity);

    const existUser = await UsersRepo.find({
      where: {
        email: dto.email,
      },
    });

    if (existUser) {
      // throw new
      return 5;
    }

    return 'signup-pattern';
  }

  async signin() {
    return 'signin-pattern';
  }

  async signout() {
    return 'signout-pattern';
  }
}
