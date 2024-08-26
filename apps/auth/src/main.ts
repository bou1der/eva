import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import ConfigService from '@ConfigService';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppConfigModule } from './app.config';

async function bootstrap() {
  const Config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppConfigModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [Config.get('KAFKA_BROKER')],
          clientId: Config.get('AUTH_CLIENT'),
        },
        consumer: {
          groupId: Config.get('AUTH_GROUP'),
        },
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 Auth service is running...`);
}

bootstrap();
