import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_NAME } from 'src/common/enum';
import { AppConfig } from 'src/config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: DB_NAME.DB_POSTGRES,
      useFactory: (configService: ConfigService) => {
        const db = configService.get<AppConfig['postgres']>('postgres');

        console.log(`Application is running postgres`);
        return {
          type: db.type,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          synchronize: db.synchronize,
          autoLoadEntities: db.autoLoadEntities,
          entities: db.entities && [process.cwd() + db.entities],
          logging: db.logging,
          cache: db.cache,
          seeds: db.seeds && [process.cwd() + db.seeds],
          ssl: {
            rejectUnauthorized: false,
          },
        } as TypeOrmModuleOptions & Partial<DataSourceOptions> & SeederOptions;
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        await runSeeders(dataSource);
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
