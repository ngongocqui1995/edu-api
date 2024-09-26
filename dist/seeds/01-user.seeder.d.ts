import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export default class UserSeeder implements Seeder {
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>;
}
