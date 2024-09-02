import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { EnvModule, EnvService } from '~/libs/shared/src/lib/config';
import { MainModule } from './main.module';
@Module({
  imports: [EnvModule],
})
class BootstrapModule {}

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(BootstrapModule);
  const env = appCtx.get(EnvService);
  appCtx.close();
  const app = await NestFactory.create(MainModule, {
    snapshot: true,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = env.get('API_GATEWAY_PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
