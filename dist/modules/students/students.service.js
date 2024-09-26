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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const student_entity_1 = require("./entities/student.entity");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const enum_1 = require("../../common/enum");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../../base/base.service");
const crud_1 = require("@nestjsx/crud");
const await_to_js_1 = require("await-to-js");
let StudentsService = class StudentsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, dataSource, baseService) {
        super(repo);
        this.repo = repo;
        this.dataSource = dataSource;
        this.baseService = baseService;
        this.model_name = enum_1.ENUM_MODEL.STUDENT;
    }
    get base() {
        return this;
    }
    async validate(dto, id) {
        await this.baseService.Unique(enum_1.ENUM_FIELD.EMAIL, student_entity_1.Student, {
            email: dto.email,
            ...(id && { id: (0, typeorm_2.Not)(id) }),
        });
        await this.baseService.Unique(enum_1.ENUM_FIELD.PHONE, student_entity_1.Student, {
            phone: dto.phone,
            ...(id && { id: (0, typeorm_2.Not)(id) }),
        });
    }
    async replaceOneBase(id, req, dto) {
        await this.validate(dto, id);
        const [err] = await (0, await_to_js_1.default)(this.replaceOne(req, dto));
        if (err)
            this.baseService.ThrowError(err.message);
        return {
            status: common_1.HttpStatus.OK,
            message: this.baseService.MessageUpdate(this.model_name),
        };
    }
    async updateOneBase(id, req, dto) {
        await this.validate(dto, id);
        const [err] = await (0, await_to_js_1.default)(this.updateOne(req, dto));
        if (err)
            this.baseService.ThrowError(err.message);
        return {
            status: common_1.HttpStatus.OK,
            message: this.baseService.MessageUpdate(this.model_name),
        };
    }
    async createOneBase(req, dto) {
        await this.validate(dto);
        const [err] = await (0, await_to_js_1.default)(this.createOne(req, {
            ...dto,
        }));
        if (err)
            this.baseService.ThrowError(err.message);
        return {
            status: common_1.HttpStatus.OK,
            message: this.baseService.MessageCreate(this.model_name),
        };
    }
    async changeStatus(id, changeStatusDTO) {
        const [err] = await (0, await_to_js_1.default)(this.repo.update(id, { status: changeStatusDTO.status }));
        if (err)
            this.baseService.ThrowError(err.message);
        return {
            status: common_1.HttpStatus.OK,
            message: this.baseService.MessageChangeStatus(this.model_name),
        };
    }
    async changePassword(changePasswordDTO) {
        const [err] = await (0, await_to_js_1.default)(this.repo.update(changePasswordDTO.student, {
            password: changePasswordDTO.new_password,
        }));
        if (err)
            this.baseService.ThrowError(err.message);
        return {
            status: common_1.HttpStatus.OK,
            message: this.baseService.MessageUpdate(enum_1.ENUM_FIELD.PASSWORD),
        };
    }
};
exports.StudentsService = StudentsService;
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, crud_1.ParsedRequest)()),
    __param(2, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsService.prototype, "replaceOneBase", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, crud_1.ParsedRequest)()),
    __param(2, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsService.prototype, "updateOneBase", null);
__decorate([
    __param(0, (0, crud_1.ParsedRequest)()),
    __param(1, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsService.prototype, "createOneBase", null);
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student, enum_1.DB_NAME.DB_POSTGRES)),
    __param(1, (0, typeorm_1.InjectDataSource)(enum_1.DB_NAME.DB_POSTGRES)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => base_service_1.BaseService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        base_service_1.BaseService])
], StudentsService);
//# sourceMappingURL=students.service.js.map