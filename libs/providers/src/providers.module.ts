import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeOrmModule, ConfigModule],
})
export class ProvidersModule {}
