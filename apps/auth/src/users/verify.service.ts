import { BadRequestException, Injectable } from '@nestjs/common';
import { VerificationEntity } from '@shared/entities';
import * as crypto from 'crypto';
import { DataSource } from 'typeorm';

@Injectable()
export class VerifyService {
  constructor(private readonly db: DataSource) {}

  async create(email: string) {
    const verification = new VerificationEntity();

    verification.identifier = email;
    verification.token = crypto.randomBytes(32).toString('hex');

    return await this.db.getRepository(VerificationEntity).save(verification);
  }

  async findOne(token: string) {
    return await this.db.getRepository(VerificationEntity).findOne({
      where: [{ token }],
    });
  }

  async delete(token: string) {
    return await this.db.getRepository(VerificationEntity).delete({
      token,
    });
  }

  async sign(token: string) {
    const existVerify = await this.findOne(token);
    if (!existVerify) {
      throw new BadRequestException('Ссылка недействительна');
    }
    this.delete(existVerify.token);
    return existVerify;
  }
}
