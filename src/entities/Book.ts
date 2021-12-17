import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Author } from '.';

@Entity()
export class Book {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @ManyToOne({ entity: () => Author })
  author: Author;
}
