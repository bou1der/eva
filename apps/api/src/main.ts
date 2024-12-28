import { ConfigModule } from '@app/providers/config/config.module';
import { ConfigService } from '@app/providers/config/config.service';
import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

@Module({
  imports: [ConfigModule],
})
class Bootstrap {}
async function bootstrap() {
  const AppCtx = await NestFactory.createApplicationContext(Bootstrap);
  const env = AppCtx.get(ConfigService);
  AppCtx.close();

  const port = env.get('API_GATEWAY_PORT');
  const app = await NestFactory.create(ApiModule);
  await app.listen(port);
  Logger.log(`🚀 Gateway is running on:${port}`);
}
bootstrap();
