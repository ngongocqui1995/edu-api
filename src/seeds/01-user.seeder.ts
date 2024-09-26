import * as _ from 'lodash';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

const users = [
  {
    email: 'root@gmail.com',
    phone: '0857894172',
    name: 'Root',
    password: 'Root1@',
  },
];

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repositoryUser = dataSource.getRepository(User);

    for (const user of users) {
      const exist = await repositoryUser.findOne({
        where: [{ email: user.email }, { phone: user.phone }],
      });
      if (exist) continue;

      // const salt = bcrypt.genSaltSync(10);
      // const hashPassword = bcrypt.hashSync(user.password, salt);
      await repositoryUser.insert({ ...user, password: user.password });
    }
  }
}
