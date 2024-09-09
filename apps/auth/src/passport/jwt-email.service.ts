import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepoService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class JwtEmailService {
  constructor(
    private readonly UserService: UserRepoService,
    private readonly JwtStrategy: JwtStrategy,
    private readonly JwtService: JwtService,
  ) {}
}
