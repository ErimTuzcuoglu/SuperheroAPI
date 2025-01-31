import { randomUUID } from 'crypto';
import { IEntity } from './contract';

export default class Database<T extends IEntity> {
  private records: T[] = [];

  public create(data: Partial<T>): Promise<T> {
    const newRecord = {
      ...data,
      id: randomUUID(),
      createdAt: Date.now().toString(),
    } as T;
    this.records.push(newRecord);
    return new Promise(function (resolve, reject) {
      resolve(newRecord);
    });
  }

  public find(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      resolve(this.records);
    });
  }

  public findById(id: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      resolve(this.records.find((record) => record.id === id));
    });
  }

  public delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.records.findIndex((record) => record.id === id);
      if (index === -1) resolve(false);
      this.records.splice(index, 1);
      resolve(true);
    });
  }

  public async update(id: string, data: Partial<T>): Promise<T | undefined> {
    const record = await this.findById(id);
    if (record) {
      Object.assign(record, data);
      record.updatedAt = Date.now().toString();

      return new Promise(function (resolve, reject) {
        resolve(record);
      });
    }
    return undefined;
  }
}
