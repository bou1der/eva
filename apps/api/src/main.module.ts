import { EnvModule } from '@config/global';
import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [EnvModule, GatewayModule],
  providers: [],
})
export class MainModule {}
