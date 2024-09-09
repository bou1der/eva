import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { EnvModule, EnvService } from '@config/global';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

@Module({
  imports: [EnvModule],
})
class Bootstrap {}

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(Bootstrap);
  const env = appCtx.get(EnvService);

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
  await app.listen();
  Logger.log(`🚀 Auth service is running...`);
}

bootstrap();
