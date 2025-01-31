import { ConfigModule } from '@nestjs/config';

const envFile = `.env.${process.env.NODE_ENV}`;

export const EnvironmentConfig = {
  envFile,
  config: () => {
    return ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: envFile,
    });
  },
};
