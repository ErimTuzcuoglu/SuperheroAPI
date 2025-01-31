import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    return this.superheroService.create(createSuperheroDto);
  }

  @Get()
  findAll(): Promise<Superhero[]> {
    return this.superheroService.findAll();
  }
}
