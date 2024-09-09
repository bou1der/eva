import { EnvModule, EnvService } from '@config/global';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const MAILER_SERVICE = 'MAILER_SERVICE';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [EnvModule],
          name: MAILER_SERVICE,
          useFactory: (config: EnvService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [config.get('KAFKA_BROKER')],
              },
              consumer: {
                groupId: config.get('MAILER_GROUP'),
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
export class MailerTransport {}
