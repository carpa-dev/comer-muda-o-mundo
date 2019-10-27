import { TypeOrmConfigService } from '../src/typeorm.service';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/auth/user.entity';
import { BASE_OPTIONS } from '../src/typeorm.service';

export class MockTypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      entities: BASE_OPTIONS.entities,
      type: 'sqlite',
      database: 'e2e.sql',
      retryAttempts: 1,

      // We want a clean database state, but need some of the dev data to test swaps
      dropSchema: true,
      synchronize: true,

      // seed data
      migrationsRun: true,
      migrations: ['test/seed/*.ts'],
    };
  }
}
