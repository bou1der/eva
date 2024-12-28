import { CreateUserDto } from '@lib/dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('/')
  async getHello(@Body(ValidationPipe) dto: CreateUserDto) {
    return await this.apiService.getHello(dto);
  }

  @Get('/signin:token')
  async signin(@Param('token') token: string) {
    this.apiService.signin({ token });
  }
}
