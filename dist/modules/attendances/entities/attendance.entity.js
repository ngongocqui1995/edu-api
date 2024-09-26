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
exports.Attendance = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../../common/enum");
const class_entity_1 = require("../../classes/entities/class.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const base_entity_1 = require("../../../base/entities/base.entity");
let Attendance = class Attendance extends base_entity_1.BaseEntity {
};
exports.Attendance = Attendance;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.Index)('pk_attendance_id', ['id'], { unique: true }),
    __metadata("design:type", String)
], Attendance.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, typeorm_1.ManyToOne)(() => class_entity_1.Class, (l) => l.attendances, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'class_id' }),
    __metadata("design:type", class_entity_1.Class)
], Attendance.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.attendances, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], Attendance.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.ENUM_STATUS, required: false }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        default: enum_1.ENUM_STATUS.ACTIVE,
        enum: enum_1.ENUM_STATUS,
    }),
    __metadata("design:type", String)
], Attendance.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Attendance.prototype, "attendance_date", void 0);
exports.Attendance = Attendance = __decorate([
    (0, typeorm_1.Entity)('attendances')
], Attendance);
//# sourceMappingURL=attendance.entity.js.map