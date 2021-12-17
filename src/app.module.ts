import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import mikroConfig from '../mikro-orm.config';
import { CONTROLLERS } from './controllers';
import { Author, Book, Publisher } from './entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroConfig),
    MikroOrmModule.forFeature({ entities: [Author, Publisher, Book] }),
  ],
  controllers: CONTROLLERS,
})
export class AppModule {}
