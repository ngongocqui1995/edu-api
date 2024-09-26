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
exports.ChangePasswordTeacherDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const validator_decorator_1 = require("../../../common/decorators/validator.decorator");
const teacher_entity_1 = require("../entities/teacher.entity");
class ChangePasswordTeacherDTO {
}
exports.ChangePasswordTeacherDTO = ChangePasswordTeacherDTO;
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsPassword)(),
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], ChangePasswordTeacherDTO.prototype, "new_password", void 0);
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsPassword)(),
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], ChangePasswordTeacherDTO.prototype, "confirm_password", void 0);
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsExist)(teacher_entity_1.Teacher),
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], ChangePasswordTeacherDTO.prototype, "teacher", void 0);
//# sourceMappingURL=change-password-teacher.dto.js.map