import { EnvModule, EnvService } from '@config/global';
import { Logger, Module } from '@nestjs/common';
import {
  AccountEntity,
  UserEntity,
  VerificationEntity,
} from '@shared/entities';
import { DataSource } from 'typeorm';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: DataSource,
      useFactory: async (config: EnvService) => {
        try {
          const db = new DataSource({
            type: 'postgres',
            url: config.get('DATABASE_URL'),
            synchronize: true,
            entities: [UserEntity, AccountEntity, VerificationEntity],
          });
          if (await db.initialize()) {
            console.log('Auth database successfully');
            db.synchronize();
            return db;
          }
        } catch (error) {
          Logger.log(error);
          throw error;
        }
      },
      inject: [EnvService],
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
