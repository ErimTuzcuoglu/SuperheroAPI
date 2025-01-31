import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from '../superhero.service';
import { Superhero } from '../entities/superhero.entity';
import Repository from '../../../persistence/repository';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';

// Repository için mock sınıf oluşturuyoruz
class MockRepository<T> {
  private data: T[] = [];

  create(item: Partial<T>): Promise<T> {
    const newItem = { ...item, id: 'test-id' } as T;
    this.data.push(newItem);
    return new Promise(function (resolve, reject) {
      resolve(newItem);
    });
  }

  find(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }
}

describe('SuperheroService', () => {
  let service: SuperheroService;
  let repository: MockRepository<Superhero>;

  beforeEach(async () => {
    repository = new MockRepository<Superhero>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        { provide: Repository, useValue: repository },
      ],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a superhero', async () => {
    const createDto: CreateSuperheroDto = {
      name: 'Batman',
      superpower: 'Intelligence',
      humilityScore: 0,
    };

    const result = await service.create(createDto);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe(createDto.name);
    expect(result.superpower).toBe(createDto.superpower);
  });

  it('should return all superheroes', async () => {
    await service.create({
      name: 'Superman',
      superpower: 'Super strength',
      humilityScore: 3,
    });
    await service.create({
      name: 'Wonder Woman',
      superpower: 'Amazonian strength',
      humilityScore: 8,
    });

    const result = await service.findAll();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Superman');
    expect(result[1].name).toBe('Wonder Woman');
  });
});
