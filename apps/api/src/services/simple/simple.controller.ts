import { CreateUserDto } from '@nest/user/dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SimpleService } from './simple.service';

@Controller('/simple')
export class SimpleController {
  constructor(private readonly SimpleService: SimpleService) {}
  @Post('/check')
  getData(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.SimpleService.getData(dto);
  }
}
