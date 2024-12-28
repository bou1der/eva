import { CreateVerifyDto } from '@lib/dto';
import { Verification } from '@lib/entities/verification.entity';
import { Injectable } from '@nestjs/common';
import { VerificationFilterSchema } from '@type/filters';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VerificationRepository {
  private repository: Repository<Verification>;

  constructor(private readonly db: DataSource) {
    this.repository = db.getRepository(Verification);
  }

  async findOne(
    input?: VerificationFilterSchema,
  ): Promise<Verification | undefined> {
    return await this.repository.findOne({
      where: [
        input?.token ? { token: input.token } : undefined,
        input?.email ? { email: input.email } : undefined,
      ],
    });
  }

  async findAll(input?: VerificationFilterSchema): Promise<Verification[]> {
    return await this.repository.find({
      where: [
        input?.token ? { token: input.token } : undefined,
        input?.email ? { email: input.email } : undefined,
      ],
    });
  }

  async create(dto: CreateVerifyDto) {
    return await this.repository.upsert(dto, {
      conflictPaths: {
        email: true,
      },
      upsertType: 'on-duplicate-key-update',
    });
  }

  async delete(input: VerificationFilterSchema) {
    return await this.repository.delete({
      token: input.token,
      email: input.email,
    });
  }
}
