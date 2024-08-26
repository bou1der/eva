import { z } from 'zod';

const t = ['ADMIN', 'OPERATOR', 'DRIVER', 'UNKNOWN'] as const;

export const rolesEnum = z.enum(t, {
  message: 'Недопустимая роль',
});

export type Role = z.infer<typeof rolesEnum>;

export const RolesArray: Role[] = [...t];
