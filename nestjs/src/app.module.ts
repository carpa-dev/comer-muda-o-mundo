import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, bootstrapConfig } from './config/config.service';
import { InitiativeModule } from './initiative/initiative.module';
import { Initiative } from './initiative/initiative.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: bootstrapConfig.TYPEORM_URL,
      type: bootstrapConfig.TYPEORM_CONNECTION,
      database: bootstrapConfig.TYPEORM_DATABASE,
      synchronize: bootstrapConfig.TYPEORM_SYNCHRONIZE,
      logging: bootstrapConfig.TYPEORM_LOGGING,
      entities: [Initiative],
    }),
    InitiativeModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
