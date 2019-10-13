import { Module } from '@nestjs/common';
import { Initiative } from './initiative.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitiativeService } from './initiative.service';
import { InitiativeController } from './initiative.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Initiative])],
  exports: [TypeOrmModule],
  providers: [InitiativeService],
  controllers: [InitiativeController],
})
export class InitiativeModule {}
