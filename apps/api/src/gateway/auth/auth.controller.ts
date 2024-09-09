import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@shared/dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    this.authService.signup(dto);
  }

  @Get('/signin:token')
  async signin(@Param('token') token: string) {
    return await this.authService.signin(token);
  }

  @Get('/refresh')
  async refresh() {
    return await this.authService.refresh();
  }
  @Get('/logout')
  async logout() {
    return await this.authService.logout();
  }

  @Get('/')
  @UseGuards(JwtGuard)
  test() {
    console.log('guard is true');
    return;
  }
}
