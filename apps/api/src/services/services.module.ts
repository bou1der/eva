import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SimpleModule } from './simple/simple.module';

@Module({
  imports: [SimpleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ServicesModule {}
