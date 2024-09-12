import { z } from 'zod';

export const EnvSchema = z.object({
  KAFKA_BROKER: z.coerce.string().default('localhost:9092'),
  API_GATEWAY_PORT: z.coerce.string().default('8080'),
  AUTH_GROUP: z.coerce.string().default('auth-group'),
  MAILER_GROUP: z.coerce.string().default('mailer-group'),
  JWT_SECRET: z.coerce.string().default('DEV'),
  REFRESH_JWT_SECRET: z.coerce.string().default('REF_DEV'),
  SERVER_HOST: z.coerce.string().default(`http://localhost:8080`),
  MAIL_FROM: z.coerce.string().default(undefined),
  MAIL_SERVER: z.coerce.string().default(undefined),
  DATABASE_URL: z.coerce
    .string()
    .min(1)
    .default('postgresql://admin:admin@db:5432/test'),
  NODE_ENV: z.coerce.string().default('dev'),
});

export type Env = z.infer<typeof EnvSchema>;

export type EnvEnum = keyof Env;
