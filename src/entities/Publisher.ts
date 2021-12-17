import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Publisher {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;
}
