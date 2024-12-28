import { CreateUserDto, VerifyDto } from '@lib/dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthorizateService } from '../services/authorizate.service';

@Controller()
export class AuthorizateController {
  constructor(private readonly authorizateService: AuthorizateService) {}
  @MessagePattern('signup')
  async signup(@Payload() dto: CreateUserDto) {
    return await this.authorizateService.signup(dto);
  }

  @MessagePattern('signin')
  async signin(@Payload() dto: VerifyDto) {
    this.authorizateService.signin(dto);
  }

  @MessagePattern('logout')
  async logout() {}
}
