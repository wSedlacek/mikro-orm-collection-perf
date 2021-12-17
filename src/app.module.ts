import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import mikroConfig from '../mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroConfig)],
})
export class AppModule {}
