import { EnvModule } from '@config/global';
import { Module } from '@nestjs/common';
import { AuthClientModule } from '~/libs/state/src/modules';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [EnvModule, AuthClientModule, GatewayModule],
  providers: [],
})
export class MainModule {}
