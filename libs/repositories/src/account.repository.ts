import { Account } from '@lib/entities';
import { AccountFilterSchema } from '@type/filters';
import { DataSource, Repository } from 'typeorm';

export class AccountRepository {
  private repository: Repository<Account>;

  constructor(private readonly db: DataSource) {
    this.repository = this.db.getRepository(Account);
  }

  async find(input: AccountFilterSchema) {
    return await this.repository.find({
      where: [
        input?.access ? { access: input.access } : undefined,
        input?.refresh ? { refresh: input.refresh } : undefined,
        { user: { email: input.email } },
      ],
    });
  }
}
