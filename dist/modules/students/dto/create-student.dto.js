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
exports.CreateStudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validator_decorator_1 = require("../../../common/decorators/validator.decorator");
const enum_1 = require("../../../common/enum");
const class_entity_1 = require("../../classes/entities/class.entity");
class CreateStudentDto {
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsEmail)(),
    (0, validator_decorator_1.Length)(5, 100),
    (0, class_transformer_1.Transform)((params) => String(params.value).trim()),
    (0, swagger_1.ApiProperty)({ type: String, minLength: 5, maxLength: 100, required: true }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsPassword)(),
    (0, validator_decorator_1.Length)(5, 100),
    (0, swagger_1.ApiProperty)({
        type: String,
        required: true,
        description: 'Mật khẩu phải 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự đặc biệt!',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "password", void 0);
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.Length)(3, 50),
    (0, swagger_1.ApiProperty)({ type: String, minLength: 3, maxLength: 50, required: true }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "name", void 0);
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsNumberString)(),
    (0, validator_decorator_1.Length)(10, 10),
    (0, class_transformer_1.Transform)((params) => String(params.value).trim()),
    (0, swagger_1.ApiProperty)({ type: String, minLength: 10, maxLength: 10, required: true }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsExists)(class_entity_1.Class),
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", Array)
], CreateStudentDto.prototype, "classes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsEnum)(enum_1.ENUM_GENDER),
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsEnum)(enum_1.ENUM_STATUS),
    (0, swagger_1.ApiProperty)({ enum: enum_1.ENUM_STATUS, required: false }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "status", void 0);
//# sourceMappingURL=create-student.dto.js.map