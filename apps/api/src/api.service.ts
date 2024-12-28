import { AuthAdapter } from '@app/adapters/auth/auth.adapter';
import { CreateUserDto, VerifyDto } from '@lib/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private readonly auth: AuthAdapter) {}
  async getHello(dto: CreateUserDto) {
    return await this.auth.signup(dto);
  }

  async signin(dto: VerifyDto) {
    return await this.auth.signin(dto);
  }
}
