"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../../common/enum");
const base_entity_1 = require("../../../base/entities/base.entity");
const teacher_entity_1 = require("../../teachers/entities/teacher.entity");
const attendance_entity_1 = require("../../attendances/entities/attendance.entity");
let Class = class Class extends base_entity_1.BaseEntity {
};
exports.Class = Class;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.Index)('pk_class_id', ['id'], { unique: true }),
    __metadata("design:type", String)
], Class.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, minLength: 3, maxLength: 50, required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 50 }),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.classes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_id' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], Class.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, (attendance) => attendance.class),
    __metadata("design:type", Array)
], Class.prototype, "attendances", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.ENUM_STATUS, required: false }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        default: enum_1.ENUM_STATUS.ACTIVE,
        enum: enum_1.ENUM_STATUS,
    }),
    __metadata("design:type", String)
], Class.prototype, "status", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Entity)('classes')
], Class);
//# sourceMappingURL=class.entity.js.map