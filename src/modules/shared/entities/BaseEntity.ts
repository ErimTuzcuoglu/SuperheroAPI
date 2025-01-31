import { IEntity } from 'src/persistence/contract';

export class BaseEntity implements IEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
