import { Module } from '@nestjs/common';
import { EnvironmentConfig } from './environment.config';

@Module({
  imports: [EnvironmentConfig.config()],
})
export class EnvironmentModule {}
