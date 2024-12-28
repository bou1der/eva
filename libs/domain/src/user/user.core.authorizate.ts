import { UserRepository } from '@app/repositories/user.repository';
import { CreateUserDto } from '@lib/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCoreAuthorizate {
  constructor(private readonly repository: UserRepository) {}

  //TODO дай блять нормальное название методу
  async regUser(input: CreateUserDto) {
    const existUser = await this.repository.findOne({ email: input.email });
    if (existUser) {
      return existUser;
    }

    return await this.repository.create(input);
  }
}
