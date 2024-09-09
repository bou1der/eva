import { Module } from '@nestjs/common';
import { MailerClientModule } from '@state/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModuleStrategy } from './passport/jwt.module';
import { UserRepoModule } from './users/users.module';

@Module({
  imports: [UserRepoModule, JwtModuleStrategy, MailerClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
