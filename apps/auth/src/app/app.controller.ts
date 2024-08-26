import { Controller, ValidationPipe } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-user')
  CreateUser(@Payload(ValidationPipe) dto: CreateUserDto) {
    console.log(dto);
    return this.appService.CreateUser(dto);
  }
  @MessagePattern('get-user')
  getUser(@Payload(ValidationPipe) dto: CreateUserDto) {
    return this.appService.GetUser(dto);
  }
}
