import { type Role, Roles } from '@type/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAbstract } from './abstract/user.abstract';
import { Account } from './account.entity';

@Entity('users')
export class User implements UserAbstract {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  readonly email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: Roles,
    default: 'UNKNOWN' as Role,
  })
  role: Role;

  @OneToMany(() => Account, (account) => account.user)
  @JoinColumn()
  accounts?: Account[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: string;
}
