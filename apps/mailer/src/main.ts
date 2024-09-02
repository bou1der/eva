import { EnvModule, EnvService } from '@config/global';
import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailerConfigModule } from './config.module';

@Module({
  imports: [EnvModule],
})
class BootstrapModule {}

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(BootstrapModule);
  const config = appCtx.get(EnvService);
  appCtx.close();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerConfigModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [config.get('KAFKA_BROKER')],
        },
        consumer: {
          groupId: config.get('MAILER_GROUP'),
        },
      },
    },
  );
  await app.listen();
  Logger.log('🚀 Mailer service is running...');
}
bootstrap();
