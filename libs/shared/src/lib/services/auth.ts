// TODO:Сделать типы из ивент паттернов

import { z } from 'zod';
import { AuthService } from '~/apps/auth/src/app/auth.service';

const t = ['signup', 'signin', 'signout'] as const;
const EventEnum = z.enum(t);

export type AuthEventsPatternsEnum = z.infer<typeof EventEnum>;

export type GenReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never; // сомнительно но окээээй?

type t = GenReturnType<typeof AuthService.prototype.signup>;

const Prototype = AuthService.prototype;

type AuthEventPatternSchema = {
  [K in AuthEventsPatternsEnum]: {
    pattern: K;
    input: Parameters<(typeof Prototype)[K]>;
    output: GenReturnType<(typeof Prototype)[K]>;
  };
};

export type ReturnEventType<
  K extends AuthEventsPatternsEnum,
  T extends keyof AuthEventPatternSchema[K] = 'pattern',
> = AuthEventPatternSchema[K][T];
