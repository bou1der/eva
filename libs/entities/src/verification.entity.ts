import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verification')
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  readonly email: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  token: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: string;
}
