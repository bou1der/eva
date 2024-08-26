import { MinLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  @MinLength(8)
  password: string;

  refresh?: string;
  access?: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
