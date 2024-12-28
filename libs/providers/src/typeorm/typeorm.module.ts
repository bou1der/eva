import { Account, User, Verification } from '@lib/entities';
import { Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      useFactory: async (config: ConfigService) => {
        try {
          const db = new DataSource({
            type: 'postgres',
            url: config.get('DATABASE_URL'),
            synchronize: true,
            entities: [User, Verification, Account],
            logging: !(config.get('NODE_ENV') === 'prod'),
            // migrations: [
            //   join(process.cwd(), 'migrations', '**', '*migration.ts'),
            // ],
            // migrationsRun: false,
            // migrationsTableName: 'migrations-test',
          });

          if (await db.initialize()) {
            console.log('Database connect succesfully');
            await db.synchronize();
            return db;
          }
        } catch (error) {
          Logger.log(error);
          throw error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
