import { Provider } from '@type/enum';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountAbstract } from './abstract/account.abstract';
import { User } from './user.entity';

@Entity()
export class Account implements AccountAbstract {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  provider: Provider;

  access?: string;
  refresh?: string;

  @OneToOne(() => User, (user) => user.accounts)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
