import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import ConfigService from '~/libs/shared/src/lib/config';
import { SimpleController } from './simple.controller';
import { SimpleService } from './simple.service';

const Config = new ConfigService();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SIMPLE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: Config.get('SIMPLE_CLIENT'),
            brokers: [Config.get('KAFKA_BROKER')],
          },
          consumer: {
            groupId: Config.get('SIMPLE_GROUP'),
          },
        },
      },
    ]),
  ],
  controllers: [SimpleController],
  providers: [SimpleService],
})
export class SimpleModule {}
