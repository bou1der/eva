import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { JwtInjectModule } from './jwt.module';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, ConfigModule, JwtInjectModule],
  providers: [jwtStrategy],
})
export class EmailAuthorizateModule {}
