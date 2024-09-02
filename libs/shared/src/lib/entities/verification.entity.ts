import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('verification')
export class VerificationEntity {
  @PrimaryColumn()
  identifier: string;

  @Column()
  token: string;

  @CreateDateColumn()
  timestamp: string;
}
