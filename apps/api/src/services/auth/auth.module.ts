import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import ConfigService from '~/libs/shared/src/lib/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const Config = new ConfigService();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: Config.get('AUTH_CLIENT'),
            brokers: [Config.get('KAFKA_BROKER')],
          },
          consumer: {
            groupId: Config.get('AUTH_GROUP'),
          },
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
