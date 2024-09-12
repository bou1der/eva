import { z } from 'zod';

export const rolesArray = ['UNKNOWN', 'RIDER', 'OPERATOR', 'ADMIN'] as const;

export const RolesSchema = z.enum(rolesArray, {
  message: 'Неверная роль',
});

export type Role = z.infer<typeof RolesSchema>;

export const Roles: Role[] = [...rolesArray];

export const providersArray = ['email'] as const;

export const ProvidersSchema = z.enum(providersArray, {
  message: 'Неверный провайдер',
});

export type Provider = z.infer<typeof ProvidersSchema>;

export const Providers = [...providersArray];
