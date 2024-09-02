import { z } from 'zod';

export const EnvSchema = z.object({
  KAFKA_BROKER: z.string().default('localhost:9092'),
  API_GATEWAY_PORT: z.string().default('8080'),

  AUTH_GROUP: z.coerce.string().default('auth-group'),
  MAILER_GROUP: z.coerce.string().default('mailer-group'),
  JWT_SECRET: z.coerce.string().default('DEV'),
  SERVER_HOST: z.coerce.string().default(`http://localhost:8080`),
  MAIL_FROM: z.coerce.string().default(undefined),
  MAIL_SERVER: z.coerce.string().default(undefined),
});

export type Env = z.infer<typeof EnvSchema>;

export type EnvEnum = keyof Env;
