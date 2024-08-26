import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '~/libs/shared/src/lib/dto';
import { AccountEntity } from '~/libs/shared/src/lib/entities/account.entity';
import { UserEntity } from '~/libs/shared/src/lib/entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly db: DataSource) {}
  async CreateUser(dto: CreateUserDto) {
    console.log('auth service worked');
    const t = this.db.getRepository(UserEntity);
    const user = t.create();
    user.email = dto.email;
    user.password = dto.passwd;
    t.save(user);
    console.log(user);
    return user;
  }
  async GetUser(dto: CreateUserDto) {
    const AccountsRepo = this.db.getRepository(AccountEntity);
    const Account = AccountsRepo.create();
    Account.password = 'testtesttest';

    await AccountsRepo.save(Account);

    const newAccount = await AccountsRepo.find({
      where: {
        password: 'testtesttest',
      },
      relations: {
        user: true,
      },
    });
    console.log(newAccount);

    // const repo = this.db.getRepository(UserEntity);
    // const user = await repo.findOne({
    //   where: {
    //     email: dto.email,
    //   },
    // });
    // console.log(user);
    //
    // return user.id;
  }
}
