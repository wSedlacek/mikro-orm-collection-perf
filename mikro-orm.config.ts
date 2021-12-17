import { Options, ReflectMetadataProvider } from '@mikro-orm/core';
import * as dotenv from 'dotenv';

import { Author, Book, Publisher } from './src/entities';

dotenv.config();

export const mikroConfig: Options = {
  type: 'postgresql',
  dbName: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  metadataProvider: ReflectMetadataProvider,
  entities: [Author, Book, Publisher],
};

export default mikroConfig;
