import { EnvModule, EnvService } from '@config/global';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: JwtService,
      useFactory: async (config: EnvService) => {
        const jwt = new JwtService({
          secret: config.get('JWT_SECRET'),
          global: true,
        });

        return jwt;
      },
      inject: [EnvService],
    },
  ],
  exports: [JwtService],
})
export class JwtModule {}
