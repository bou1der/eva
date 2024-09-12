import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule],
  providers: [jwtStrategy],
})
export class EmailAuthorizateModule {}
