"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../modules/users/entities/user.entity");
const users = [
    {
        email: 'root@gmail.com',
        phone: '0857894172',
        name: 'Root',
        password: 'Root1@',
    },
];
class UserSeeder {
    async run(dataSource, factoryManager) {
        const repositoryUser = dataSource.getRepository(user_entity_1.User);
        for (const user of users) {
            const exist = await repositoryUser.findOne({
                where: [{ email: user.email }, { phone: user.phone }],
            });
            if (exist)
                continue;
            await repositoryUser.insert({ ...user, password: user.password });
        }
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=01-user.seeder.js.map