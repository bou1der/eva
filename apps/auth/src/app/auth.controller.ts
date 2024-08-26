import { Controller, ValidationPipe } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @EventPattern('signup')
  signup(@Payload(ValidationPipe) dto: CreateUserDto) {
    return this.AuthService.signup(dto);
  }

  @MessagePattern('signin')
  signin() {
    return this.AuthService.signin();
  }

  @MessagePattern('signout')
  signout() {
    return this.AuthService.signout();
  }
}
