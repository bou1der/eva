import { ConfigService } from '@app/providers/config/config.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const AUTH_SERVICE = 'AUTH_SERVICE';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [config.get('KAFKA_BROKER')],
            },
            consumer: {
              groupId: config.get('AUTH_GROUP'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class AuthAdapterModule {}
