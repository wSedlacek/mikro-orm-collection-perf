import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Publisher } from '../entities';

@Controller('publishers')
export class PublisherController {
  constructor(
    @InjectRepository(Publisher) private readonly publisherRepo: EntityRepository<Publisher>
  ) {}

  @Get()
  public async getAuthors() {
    return this.publisherRepo.findAll();
  }
}
