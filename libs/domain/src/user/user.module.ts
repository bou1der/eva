import { TypeOrmModule } from '@app/providers/typeorm/typeorm.module';
import { UserRepository } from '@app/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserCoreAuthorizate } from './user.core.authorizate';

@Module({
  imports: [TypeOrmModule],
  providers: [UserCoreAuthorizate, UserRepository],
  exports: [UserCoreAuthorizate],
})
export class UserCoreModule {}
