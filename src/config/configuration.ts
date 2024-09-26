import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

export type AppConfig = {
  instance_id: string;
  environment: string;
  server: {
    host: string;
    port: number;
    url: string;
  };
  swagger: {
    uri: string;
    path: string;
    pathJson: string;
    title: string;
    swaggerOptions: { docExpansion: string };
    description: string;
    version: string;
    auth: {
      challenge: boolean;
      users: { [username: string]: string };
    };
    bearerAuth: {
      options: {
        type: SecuritySchemeType;
        scheme: string;
        bearerFormat: string;
      };
    };
  };
  postgres: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
    logging: boolean;
    cache: boolean;
    entities: string;
    seeds: string;
  };
  i18n: {
    fallbackLanguage: string;
    fallbacks: { [key: string]: string };
  };
  jwt: {
    accessToken: {
      secret: string | Buffer;
      signOptions: {
        expiresIn: string | number;
      };
    };
    refreshToken: {
      secret: string | Buffer;
      signOptions: {
        expiresIn: string | number;
      };
    };
  };
};

export default () => {
  const configEnv = `config.${process.env.NODE_ENV}.yaml`;
  const pathEnv = process.env.NODE_ENV ? configEnv : 'config.yaml';
  const pathFile = path.join(process.cwd(), pathEnv);
  return yaml.load(readFileSync(pathFile, 'utf8')) as AppConfig;
};
