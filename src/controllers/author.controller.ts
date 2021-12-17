import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Author } from '../entities';

@Controller('authors')
export class AuthorController {
  constructor(@InjectRepository(Author) private readonly authorRepo: EntityRepository<Author>) {}

  @Get()
  public async getAuthors() {
    return this.authorRepo.findAll();
  }

  @Get(':index/unloaded-books')
  public async getUnloadedBooks(@Param('index', ParseIntPipe) index: number) {
    const authors = await this.authorRepo.findAll();
    return authors[index].books.toArray();
  }

  @Get(':index/books')
  public async getBooks(@Param('index', ParseIntPipe) index: number) {
    const authors = await this.authorRepo.findAll({ populate: ['books'] });
    return authors[index].books.toArray();
  }
}
