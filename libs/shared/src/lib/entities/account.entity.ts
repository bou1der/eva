import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AuthProvidersArray } from '@type/enums';
import { UserEntity } from './user.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: AuthProvidersArray,
  })
  provider: string;

  @Column({
    nullable: true,
  })
  refresh?: string;

  @Column({
    nullable: true,
  })
  access?: string;
}
