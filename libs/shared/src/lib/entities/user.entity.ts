import { Role, RolesArray } from '@type/enums';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
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

  @OneToOne(() => AccountEntity)
  account: string;
}
