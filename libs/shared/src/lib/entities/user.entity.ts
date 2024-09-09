import { Role, RolesArray } from '@type/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  email: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: RolesArray,
    default: 'UNKNOWN' as Role,
  })
  role: Role;

  @OneToMany(() => AccountEntity, (account) => account.user, {
    cascade: true,
  })
  accounts: AccountEntity[];
  // @OneToOne(() => AccountEntity, {
  //   nullable: false,
  //   cascade: ['insert'],
  // })
}
