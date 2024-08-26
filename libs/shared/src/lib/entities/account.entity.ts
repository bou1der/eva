import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  refresh?: string;
  access?: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
