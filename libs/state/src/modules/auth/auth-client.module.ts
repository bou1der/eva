import { Module } from '@nestjs/common';
import { AuthTransportService } from './auth-client.service';
import { AuthTransport } from './auth.transport';

@Module({
  imports: [AuthTransport],
  providers: [AuthTransportService],
  exports: [AuthTransportService],
})
export class AuthClientModule {}
