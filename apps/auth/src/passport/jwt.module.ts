import { EnvService } from '@config/global';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepoModule } from '../users/users.module';
import { JwtEmailService } from './jwt-email.service';
import { JwtStrategy } from './jwt.strategy';

export const JwtRefreshService = 'JWT_REFRESH_SERVICE';
@Module({
  imports: [
    PassportModule,
    UserRepoModule,
    JwtModule.registerAsync({
      useFactory: (config: EnvService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES'),
        },
      }),
      inject: [EnvService],
      global: true,
    }),
  ],
  providers: [JwtEmailService, JwtStrategy],
})
export class JwtModuleStrategy {}
