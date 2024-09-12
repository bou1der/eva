import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as EnvService } from '@nestjs/config';
import { Env } from './config.types';

@Injectable()
export class ConfigService {
  constructor(@Inject() private configService: EnvService<Env, true>) {}
  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
