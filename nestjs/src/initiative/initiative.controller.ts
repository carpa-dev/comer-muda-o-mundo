import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Initiative } from './initiative.entity';
import { InitiativeService } from './initiative.service';

@Crud({
  model: {
    type: Initiative,
  },
})
@Controller('initiatives')
export class InitiativeController {
  constructor(public service: InitiativeService) {}
}
