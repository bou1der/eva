import { ConfigModule } from '@app/providers/config/config.module';
import { ConfigService } from '@app/providers/config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const AppCtx = await NestFactory.createApplicationContext(ConfigModule);
  const env = AppCtx.get(ConfigService);
  AppCtx.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [env.get('KAFKA_BROKER')],
        },
        consumer: {
          groupId: env.get('AUTH_GROUP'),
        },
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log('🚀 Auth service is running...');
}
bootstrap();
