import { Module } from '@nestjs/common';
import { AuthAdapter } from './auth.adapter';
import { AuthKafkaModule } from './auth.kafka';

@Module({
  imports: [AuthKafkaModule],
  providers: [AuthAdapter],
  exports: [AuthAdapter],
})
export class AuthAdapterModule {}
