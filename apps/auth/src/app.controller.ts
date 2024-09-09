import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, JwtDto } from '@shared/dto';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly service: AppService) {}

  @MessagePattern('signup')
  signup(@Payload(ValidationPipe) dto: CreateUserDto) {
    console.log(dto);
    this.service.signup(dto);
  }

  @MessagePattern('signin')
  signin(@Payload(ValidationPipe) token: string) {
    this.service.signin(token);
  }

  @MessagePattern('refresh')
  refresh(@Payload(ValidationPipe) dto: JwtDto) {
    console.log(dto);
    return {
      ...dto,
      check: true,
    };
  }
}
