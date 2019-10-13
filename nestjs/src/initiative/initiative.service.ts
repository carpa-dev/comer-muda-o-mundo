import { Injectable } from '@nestjs/common';
import { Initiative } from './initiative.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class InitiativeService extends TypeOrmCrudService<Initiative> {
  constructor(@InjectRepository(Initiative) repo) {
    super(repo);
  }
}
