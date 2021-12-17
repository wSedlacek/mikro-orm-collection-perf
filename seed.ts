import 'reflect-metadata';

import { MikroORM } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import * as faker from 'faker';

import mikroOrmConfig from './mikro-orm.config';
import { Author, Book, Publisher } from './src/entities';

const AUTHORS = 10;
const BOOKS = 2;
const PUBLISHERS = 10;

const ids = (length: number) => Array.from({ length }, () => randomUUID());

const seed = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.em.nativeDelete(Book, {});
  await orm.em.nativeDelete(Author, {});
  await orm.em.nativeDelete(Publisher, {});

  for (const authorId of ids(AUTHORS)) {
    const author = orm.em.create(Author, { id: authorId, name: faker.name.firstName() });
    orm.em.persist(author);

    for (const bookId of ids(BOOKS)) {
      const book = orm.em.create(Book, { id: bookId, name: faker.music.genre(), author });
      orm.em.persist(book);
    }
  }

  for (const publisherId of ids(PUBLISHERS)) {
    const publisher = orm.em.create(Publisher, { id: publisherId, name: faker.name.firstName() });
    orm.em.persist(publisher);
  }

  await orm.em.flush();
  await orm.close();
};

void seed();
