import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@shared/dto';
import {
  AccountEntity,
  UserEntity
} from '@shared/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepoService {
  constructor(private readonly db: DataSource) {}

  async findOne(identifier: string) {
    return await this.db.getRepository(UserEntity).findOne({
      where: [{ id: identifier }, { email: identifier }],
      relations: ['accounts'],
    });
  }

  async create(dto: CreateUserDto) {
    const newAccount = new AccountEntity();
    newAccount.provider = 'email';

    const newUser = this.db.getRepository(UserEntity).create();
    newUser.email = dto.email;
    newUser.accounts = [newAccount];

    await this.db.getRepository(UserEntity).upsert(newUser, {
      conflictPaths: ['id'],
      upsertType: 'on-conflict-do-update',
    });
    return newUser;
  }

  async save(user: UserEntity) {
    return await this.db.getRepository(UserEntity).upsert(user, {
      conflictPaths: {
        email: true,
      },
      upsertType: 'on-conflict-do-update',
    });
  }
}
