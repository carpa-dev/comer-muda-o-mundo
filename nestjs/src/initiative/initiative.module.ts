import { Module } from '@nestjs/common';
import { Initiative } from './initiative.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitiativeService } from './initiative.service';

@Module({
  imports: [TypeOrmModule.forFeature([Initiative])],
  exports: [TypeOrmModule],
  providers: [InitiativeService],
})
export class InitiativeModule {}
