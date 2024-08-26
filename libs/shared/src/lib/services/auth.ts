// TODO?:Сделать типы из ивент паттернов
//

import { AuthService } from '~/apps/auth/src/app/auth.service';

export type GenReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never; // сомнительно но окээээй?

type t = GenReturnType<typeof AuthService.prototype.signup>;
