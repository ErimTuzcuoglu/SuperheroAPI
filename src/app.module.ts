import { Module } from '@nestjs/common';
import { SuperheroModule } from './modules/superhero/superhero.module';
import { EnvironmentModule } from './config/environment/environment.module';

@Module({
  imports: [EnvironmentModule, SuperheroModule],
})
export class AppModule {}
