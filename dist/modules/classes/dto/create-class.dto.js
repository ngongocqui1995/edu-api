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
exports.CreateClassDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validator_decorator_1 = require("../../../common/decorators/validator.decorator");
const enum_1 = require("../../../common/enum");
const student_entity_1 = require("../../students/entities/student.entity");
const teacher_entity_1 = require("../../teachers/entities/teacher.entity");
class CreateClassDto {
}
exports.CreateClassDto = CreateClassDto;
__decorate([
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.Length)(3, 50),
    (0, swagger_1.ApiProperty)({ type: String, minLength: 3, maxLength: 50, required: true }),
    __metadata("design:type", String)
], CreateClassDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsExist)(teacher_entity_1.Teacher),
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", teacher_entity_1.Teacher)
], CreateClassDto.prototype, "teacher", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsExist)(student_entity_1.Student),
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", student_entity_1.Student)
], CreateClassDto.prototype, "student", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validator_decorator_1.IsString)(),
    (0, validator_decorator_1.IsNotEmpty)(),
    (0, validator_decorator_1.IsEnum)(enum_1.ENUM_STATUS),
    (0, swagger_1.ApiProperty)({ enum: enum_1.ENUM_STATUS, required: false }),
    __metadata("design:type", String)
], CreateClassDto.prototype, "status", void 0);
//# sourceMappingURL=create-class.dto.js.map