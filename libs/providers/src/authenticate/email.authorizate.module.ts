import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { JwtAccessService } from './jwt.service';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [jwtStrategy, JwtAccessService],
  exports: [jwtStrategy, JwtAccessService],
})
export class EmailAuthorizateModule {}
