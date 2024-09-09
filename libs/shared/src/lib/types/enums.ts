import { z } from 'zod';

const AuthProviders = ['email'] as const;

export const AuthProvidersEnum = z.enum(AuthProviders);

export type AuthProvider = z.infer<typeof AuthProvidersEnum>;

export const AuthProvidersArray: AuthProvider[] = [...AuthProviders];

const Roles = ['ADMIN', 'OPERATOR', 'DRIVER', 'UNKNOWN'] as const;

export const rolesEnum = z.enum(Roles, {
  message: 'Недопустимая роль',
});

export type Role = z.infer<typeof rolesEnum>;

export const RolesArray: Role[] = [...Roles];
