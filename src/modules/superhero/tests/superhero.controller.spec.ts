import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from '../superhero.controller';
import { SuperheroService } from '../superhero.service';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';

describe('SuperheroController', () => {
  let controller: SuperheroController;
  let service: SuperheroService;

  const mockSuperheroService = {
    create: jest.fn((dto: CreateSuperheroDto) => {
      return Promise.resolve({ id: 'test-id', ...dto });
    }),
    findAll: jest.fn(() => {
      return Promise.resolve([
        {
          id: '1',
          name: 'Superman',
          superpower: 'Super strength',
          humilityScore: 9,
        },
        {
          id: '2',
          name: 'Batman',
          superpower: 'Intelligence',
          humilityScore: 8,
        },
      ]);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [
        { provide: SuperheroService, useValue: mockSuperheroService },
      ],
    }).compile();

    controller = module.get<SuperheroController>(SuperheroController);
    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a superhero', async () => {
    const dto: CreateSuperheroDto = {
      name: 'Flash',
      superpower: 'Speed',
      humilityScore: 8,
    };

    const result = await controller.create(dto);

    expect(result).toEqual({
      id: 'test-id',
      name: 'Flash',
      superpower: 'Speed',
      humilityScore: 8,
    });

    expect(mockSuperheroService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all superheroes', async () => {
    const result = await controller.findAll();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Superman');
    expect(result[1].name).toBe('Batman');

    expect(mockSuperheroService.findAll).toHaveBeenCalledTimes(1);
  });
});
