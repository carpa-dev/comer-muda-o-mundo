import { User } from './auth/user.entity';
import { Module } from '@nestjs/common';

import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const BASE_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  retryAttempts: 1,
  extra: {
    // https://stackoverflow.com/questions/22301722/ssl-for-postgresql-connection-nodejs#comment90099736_30109812
    ssl: !!process.env.DATABASE_SSL,
  },

  logging: ['query'],
  // https://github.com/zeit/ncc/issues/245#issuecomment-458583032
  entities: [User],
};

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      retryAttempts: 1,
      extra: {
        // https://stackoverflow.com/questions/22301722/ssl-for-postgresql-connection-nodejs#comment90099736_30109812
        ssl: !!process.env.DATABASE_SSL,
      },

      logging: ['query'],
      // https://github.com/zeit/ncc/issues/245#issuecomment-458583032
      entities: [User],
    };
  }
}

@Module({
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
