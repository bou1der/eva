import { UserCoreModule } from '@app/domain/user/user.module';
import { EmailAuthorizateModule } from '@app/providers/authenticate/email.authorizate.module';
import { EmailVerifyModule } from '@app/providers/email-verify/email.verify.module';
import { Module } from '@nestjs/common';
import { AuthorizateController } from './controllers/authorizate.controller';
import { AuthorizateService } from './services/authorizate.service';

@Module({
  imports: [EmailVerifyModule, EmailAuthorizateModule, UserCoreModule],
  controllers: [AuthorizateController],
  providers: [AuthorizateService],
})
export class AppModule {}
