import { Module } from '@nestjs/common';
import { AuthClientModule } from '@state/modules';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [AuthClientModule],
  controllers: [AuthController],

  providers: [AuthService],
})
export class AuthModule {}
