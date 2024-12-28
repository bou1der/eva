import { VerificationRepository } from '@app/repositories/verification.repository';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EmailVerifyService {
  constructor(private readonly repository: VerificationRepository) {}

  async sign(email: string) {
    const token: string = crypto.randomBytes(32).toString('hex');
    console.log(token);
    const verify = await this.repository.create({ token, email });
    return {
      id: verify.generatedMaps[0]['id'] as string,
      token,
    };
  }

  async verify(token: string) {
    const existToken = await this.repository.findOne({ token });
    if (!existToken) {
      return undefined;
    }

    return existToken;
  }
}
