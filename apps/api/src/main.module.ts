import { Module } from '@nestjs/common';
import { EnvGlobalModule } from '~/libs/shared/src/config.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [EnvGlobalModule, ServicesModule],
})
export class MainModule {}
