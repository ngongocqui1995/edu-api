"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendancesModule = void 0;
const common_1 = require("@nestjs/common");
const attendances_service_1 = require("./attendances.service");
const attendances_controller_1 = require("./attendances.controller");
const typeorm_1 = require("@nestjs/typeorm");
const base_module_1 = require("../../base/base.module");
const attendance_entity_1 = require("./entities/attendance.entity");
const enum_1 = require("../../common/enum");
let AttendancesModule = class AttendancesModule {
};
exports.AttendancesModule = AttendancesModule;
exports.AttendancesModule = AttendancesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([attendance_entity_1.Attendance], enum_1.DB_NAME.DB_POSTGRES),
            (0, common_1.forwardRef)(() => base_module_1.BaseModule),
        ],
        controllers: [attendances_controller_1.AttendancesController],
        providers: [attendances_service_1.AttendancesService],
        exports: [attendances_service_1.AttendancesService],
    })
], AttendancesModule);
//# sourceMappingURL=attendances.module.js.map