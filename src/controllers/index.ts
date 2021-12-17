import { AuthorController } from './author.controller';
import { PublisherController } from './publisher.controller';

export * from './author.controller';
export * from './publisher.controller';

export const CONTROLLERS = [AuthorController, PublisherController];
