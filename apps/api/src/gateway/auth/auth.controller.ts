import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '~/libs/shared/src/lib/dto/users';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @Get('/signin:token')
  async signin(@Param('token') token: string) {
    console.log(token);
    return `<h1>${token}</h1>`;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
}
