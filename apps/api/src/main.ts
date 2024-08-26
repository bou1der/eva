import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import ConfigService from '@ConfigService';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    snapshot: true,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = new ConfigService().get('API_GATEWAY_PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
