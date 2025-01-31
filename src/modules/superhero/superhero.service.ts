import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import Repository from '../../persistence/repository';
import { Superhero } from './entities/superhero.entity';

@Injectable()
export class SuperheroService {
  private superheroRepository: Repository<Superhero>;

  constructor() {
    this.superheroRepository = new Repository<Superhero>();
  }

  create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    return this.superheroRepository.create(createSuperheroDto);
  }

  findAll(): Promise<Superhero[]> {
    return this.superheroRepository.find();
  }
}
