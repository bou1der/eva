import { AuthAdapterModule } from '@app/adapters/auth/auth.adapter.module';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [AuthAdapterModule],

  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
