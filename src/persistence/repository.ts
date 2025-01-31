import { IEntity } from './contract';
import Database from './database';

export default class Repository<T extends IEntity> {
  private database: Database<T>;

  constructor(database?: Database<T>) {
    this.database = database ?? new Database<T>();
  }

  public create(data: Partial<T>): Promise<T> {
    return this.database.create(data);
  }

  public findById(id: string): Promise<T | undefined> {
    return this.database.findById(id);
  }

  public find(): Promise<T[]> {
    return this.database.find();
  }

  public delete(id: string): Promise<boolean> {
    return this.database.delete(id);
  }

  public update(id: string, data: Partial<T>): Promise<T | undefined> {
    return this.database.update(id, data);
  }
}
