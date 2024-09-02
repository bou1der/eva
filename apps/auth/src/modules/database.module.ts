import { ConfigService } from '@config/global';
import { Global, Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountEntity } from '~/libs/shared/src/lib/entities/account.entity';
import { UserEntity } from '~/libs/shared/src/lib/entities/user.entity';
import { VerificationEntity } from '~/libs/shared/src/lib/entities/verification.entity';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        try {
          const db = new DataSource({
            type: 'postgres',
            url: new ConfigService().get('DATABASE_URL'),
            synchronize: true,
            entities: [UserEntity, AccountEntity, VerificationEntity],
          });
          if (await db.initialize()) {
            console.log('Auth database successfully');
            db.synchronize();
            return db;
          }
        } catch (err) {
          Logger.log(err);
          throw err;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
