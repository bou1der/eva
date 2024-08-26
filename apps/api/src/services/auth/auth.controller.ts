import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post('/create-user')
  RegisterUser(@Body(ValidationPipe) dto: CreateUserDto) {
    this.AuthService.RegisterUser(dto);
  }
  @Post('/get-user')
  getUser(@Body(ValidationPipe) dto: CreateUserDto) {
    this.AuthService.getUser(dto);
  }
}
