import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @OneToMany({ entity: () => Book, mappedBy: (book: Book) => book.author })
  public books = new Collection<Book>(this);
}
