import { TypeOrmModule } from '@app/providers/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [TypeOrmModule],

  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
