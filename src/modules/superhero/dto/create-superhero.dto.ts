import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class CreateSuperheroDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  superpower: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
