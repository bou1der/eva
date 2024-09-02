import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '~/libs/shared/src/lib/dto/users';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('signup')
  signup(@Payload(ValidationPipe) dto: CreateUserDto) {
    this.appService.signup(dto);
  }
}
