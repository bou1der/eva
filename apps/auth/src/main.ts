import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@config/global';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppConfigModule } from './app.config';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppConfigModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [config.get('KAFKA_BROKER')],
        },
        consumer: {
          groupId: config.get('AUTH_GROUP'),
        },
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 Auth service is running...`);
}

bootstrap();
