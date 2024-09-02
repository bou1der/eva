import { EnvModule, EnvService } from '@config/global';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const AUTH_SERVICE = 'AUTH_SERVICE';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [EnvModule],
          name: AUTH_SERVICE,
          useFactory: (config: EnvService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [config.get('KAFKA_BROKER')],
              },
              consumer: {
                groupId: config.get('AUTH_GROUP'),
              },
              subscribe: {
                fromBeginning: true,
              },
            },
          }),
          inject: [EnvService],
        },
      ],
      isGlobal: true,
    }),
  ],
})
export class AuthClientModule {}
