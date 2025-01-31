import { BaseEntity } from 'src/modules/shared/entities/BaseEntity';

export class Superhero extends BaseEntity {
  name: string;
  superpower: string;
  humilityScore: number;
}
