import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitiativeModule } from './initiative/initiative.module';
import { Initiative } from './initiative/initiative.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), InitiativeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
