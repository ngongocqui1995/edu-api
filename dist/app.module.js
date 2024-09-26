"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const exist_validator_1 = require("./common/validators/exist-validator");
const exists_validator_1 = require("./common/validators/exists-validator");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const language_module_1 = require("./language/language.module");
const database_module_1 = require("./database/database.module");
const base_module_1 = require("./base/base.module");
const auth_module_1 = require("./auth/auth.module");
const teachers_module_1 = require("./modules/teachers/teachers.module");
const classes_module_1 = require("./modules/classes/classes.module");
const students_module_1 = require("./modules/students/students.module");
const attendances_module_1 = require("./modules/attendances/attendances.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [configuration_1.default] }),
            language_module_1.LanguageModule,
            database_module_1.DatabaseModule,
            base_module_1.BaseModule,
            auth_module_1.AuthModule,
            teachers_module_1.TeachersModule,
            classes_module_1.ClassesModule,
            students_module_1.StudentsModule,
            attendances_module_1.AttendancesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, exist_validator_1.IsExistValidator, exists_validator_1.IsExistsValidator],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map