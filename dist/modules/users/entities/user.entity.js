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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const enum_1 = require("../../../common/enum");
const base_entity_1 = require("../../../base/entities/base.entity");
let User = class User extends base_entity_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, typeorm_1.Index)('pk_user_id', ['id'], { unique: true }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, minLength: 5, maxLength: 100, required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: false, length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, minLength: 3, maxLength: 50, required: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.ENUM_GENDER, required: false }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        default: enum_1.ENUM_GENDER.OTHER,
        enum: enum_1.ENUM_GENDER,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.ENUM_STATUS, required: false }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        default: enum_1.ENUM_STATUS.ACTIVE,
        enum: enum_1.ENUM_STATUS,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map