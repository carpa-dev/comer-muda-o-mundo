import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitiativeModule } from './initiative/initiative.module';
import { Initiative } from './initiative/initiative.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      retryAttempts: 1,
      extra: {
        // https://stackoverflow.com/questions/22301722/ssl-for-postgresql-connection-nodejs#comment90099736_30109812
        ssl: !!process.env.DATABASE_SSL,
      },

      // https://github.com/zeit/ncc/issues/245#issuecomment-458583032
      entities: [Initiative],
    }),
    InitiativeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
