import { ConfigModule } from '@app/providers/config/config.module';
import { ConfigService } from '@app/providers/config/config.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const AUTH_SERVICE = 'AUTH_SERVICE';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
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
            subscribe: {
              fromBeginning: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthKafkaModule {}
