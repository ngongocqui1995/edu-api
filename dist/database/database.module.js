"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const enum_1 = require("../common/enum");
const typeorm_2 = require("typeorm");
const typeorm_extension_1 = require("typeorm-extension");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                name: enum_1.DB_NAME.DB_POSTGRES,
                useFactory: (configService) => {
                    const db = configService.get('postgres');
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
                    };
                },
                dataSourceFactory: async (options) => {
                    const dataSource = await new typeorm_2.DataSource(options).initialize();
                    await (0, typeorm_extension_1.runSeeders)(dataSource);
                    return dataSource;
                },
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map