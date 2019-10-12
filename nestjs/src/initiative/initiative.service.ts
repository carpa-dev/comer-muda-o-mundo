import { Injectable } from '@nestjs/common';
import { Initiative } from './initiative.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InitiativeService {
  constructor(
    @InjectRepository(Initiative)
    private readonly initiativeRepository: Repository<Initiative>,
  ) {}
}
