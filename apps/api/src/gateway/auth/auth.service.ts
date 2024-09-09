import { AuthTransportService } from '@app/state/modules/auth/auth-client.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, JwtDto } from '~/libs/shared/src/lib/dto/users';

@Injectable()
export class AuthService {
  constructor(private readonly AuthTransport: AuthTransportService) {}

  async signup(dto: CreateUserDto) {
    await this.AuthTransport.signup(dto);
  }
  async signin(token: string) {
    await this.AuthTransport.signin(token);
  }
  async refresh(jwt: JwtDto) {
    await this.AuthTransport.refresh(jwt);
  }
  async logout() {
    await this.AuthTransport.logout();
  }
}
