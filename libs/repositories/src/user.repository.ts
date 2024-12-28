import { CreateUserDto } from '@lib/dto/user/create.user.dto';
import { User } from '@lib/entities';
import { Injectable } from '@nestjs/common';
import { UserFilterSchema } from '@type/filters';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(private readonly db: DataSource) {
    this.repository = this.db.getRepository(User);
  }

  async findAll(input: UserFilterSchema) {
    return await this.repository.find({
      where: [
        input?.email ? { email: input.email } : undefined,
        input?.role ? { role: input.role } : undefined,
      ],
      relations: {
        accounts: true,
      },
    });
  }

  async findOne(input: UserFilterSchema): Promise<User | undefined> {
    return await this.repository.findOne({
      where: [
        input?.id ? { id: input.id } : undefined,
        input?.email ? { email: input.email } : undefined,
      ],
      relations: {
        accounts: true,
      },
    });
  }

  async updateSelf(user: User) {
    return {
      updateResult: await this.repository.update(
        {
          id: user.id,
        },
        user,
      ),
      user,
    };
  }

  async create(dto: CreateUserDto) {
    return await this.repository.save({ email: dto.email });
  }
}
