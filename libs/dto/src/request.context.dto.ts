import { User } from '@lib/entities';
import { Request as DefaultRequest } from 'express';
import { JwtTransferDto } from './jwt.dto';

declare module 'express' {
  interface Session extends DefaultRequest {
    session: DefaultSession;
  }
}

export class DefaultSession {
  user: Omit<User, 'accounts'>;
  jwt: JwtTransferDto;
}

export interface IHttpRequestContext extends DefaultRequest {
  session?: DefaultSession;
}
