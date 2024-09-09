import { Module } from '@nestjs/common';
import { TypeOrmModule } from './db.module';
import { UserRepoService } from './users.service';
import { VerifyService } from './verify.service';

@Module({
  imports: [TypeOrmModule],
  providers: [UserRepoService, VerifyService],
  exports: [UserRepoService, VerifyService],
})
export class UserRepoModule {}
