import ConfigService from '@ConfigService';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailerConfigModule } from './config.module';

async function bootstrap() {
  const Config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerConfigModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [Config.get('KAFKA_BROKER')],
          clientId: Config.get('MAILER_CLIENT'),
        },
        consumer: {
          groupId: Config.get('MAILER_GROUP'),
        },
      },
    },
  );
  await app.listen();
  Logger.log('🚀 Mailer service is running...');
}
bootstrap();
