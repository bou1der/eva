import { VerificationRepository } from '@app/repositories/verification.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../typeorm/typeorm.module';
import { EmailVerifyService } from './email.verify.service';

@Module({
  imports: [TypeOrmModule],
  providers: [EmailVerifyService, VerificationRepository],
  exports: [EmailVerifyService],
})
export class EmailVerifyModule {}
