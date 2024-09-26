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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const crud_1 = require("@nestjsx/crud");
const user_entity_1 = require("./entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../common/enum");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const update_status_dto_1 = require("../../base/dto/update-status.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
        this.model_name = enum_1.ENUM_MODEL.USER;
    }
    get base() {
        return this;
    }
    getMany(req) {
        return this.base.getManyBase(req);
    }
    getOne(req) {
        return this.base.getOneBase(req);
    }
    updateOne(id, req, dto) {
        return this.service.updateOneBase(id, req, dto);
    }
    replaceOne(id, req, dto) {
        return this.service.replaceOneBase(id, req, dto);
    }
    createOne(req, dto) {
        return this.service.createOneBase(req, dto);
    }
    async changeStatus(id, changeStatusDTO) {
        return this.service.changeStatus(id, changeStatusDTO);
    }
    async changePassword(req, changePasswordDTO) {
        return this.service.changePassword(req, changePasswordDTO);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    (0, crud_1.Override)(),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    (0, crud_1.Override)('getOneBase'),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    (0, crud_1.Override)('updateOneBase'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, crud_1.ParsedRequest)()),
    __param(2, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    (0, crud_1.Override)('replaceOneBase'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, crud_1.ParsedRequest)()),
    __param(2, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "replaceOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    (0, crud_1.Override)(),
    __param(0, (0, crud_1.ParsedRequest)()),
    __param(1, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createOne", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    (0, swagger_1.ApiParam)({ required: true, name: 'id', type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.ChangeStatusDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Put)('change-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(enum_1.BearerAuthName),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
exports.UsersController = UsersController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: user_entity_1.User,
        },
        dto: {
            create: create_user_dto_1.CreateUserDto,
            update: update_user_dto_1.UpdateUserDto,
        },
        routes: {
            exclude: ['deleteOneBase', 'createManyBase'],
        },
        params: {
            id: {
                type: 'uuid',
                primary: true,
                field: 'id',
            },
        },
    }),
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map