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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const enum_1 = require("../common/enum");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const create_user_dto_1 = require("../modules/users/dto/create-user.dto");
const class_validator_1 = require("class-validator");
const Status = require("statuses");
let BaseService = class BaseService {
    constructor(dataSource, i18n) {
        this.dataSource = dataSource;
        this.i18n = i18n;
        this.ThrowError = (message) => {
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        };
        this.ThrowUnauthorized = () => {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_MESSAGE[enum_1.ENUM_MESSAGE.UNAUTHORIZED];
            const message = this.i18n.t(key, { lang });
            throw new common_1.HttpException(message, common_1.HttpStatus.UNAUTHORIZED);
        };
        this.MessageLoginSuccess = () => {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_MESSAGE[enum_1.ENUM_MESSAGE.AUTHORIZED];
            return this.i18n.t(key, { lang });
        };
        this.MessageCreate = (modelName) => {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_MESSAGE[enum_1.ENUM_MESSAGE.CREATE];
            const name = enum_1.I18N_MODEL[modelName] || enum_1.I18N_FIELD[modelName];
            return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
        };
        this.MessageUpdate = (modelName) => {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_MESSAGE[enum_1.ENUM_MESSAGE.UPDATE];
            const name = enum_1.I18N_MODEL[modelName] || enum_1.I18N_FIELD[modelName];
            return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
        };
        this.MessageDelete = (modelName) => {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_MESSAGE[enum_1.ENUM_MESSAGE.DELETE];
            const name = enum_1.I18N_MODEL[modelName] || enum_1.I18N_FIELD[modelName];
            return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
        };
        this.MessageChangeStatus = (modelName) => {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_MESSAGE[enum_1.ENUM_MESSAGE.CHANGE_STATUS];
            const name = enum_1.I18N_MODEL[modelName] || enum_1.I18N_FIELD[modelName];
            return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
        };
    }
    HashPassword(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    async ValidatePassword(password) {
        const { lang } = nestjs_i18n_1.I18nContext.current();
        const createUser = new create_user_dto_1.CreateUserDto();
        createUser.password = password;
        const validationErrors = await (0, class_validator_1.validate)(createUser, {
            skipMissingProperties: true,
        });
        const errors = [];
        for (const validationError of validationErrors) {
            for (const constraint of Object.values(validationError.constraints)) {
                const constraints = constraint.split('|');
                const key = constraints[0] ?? '';
                const args = constraints[1] ?? JSON.parse(constraints[1]);
                const name = this.i18n.t(enum_1.I18N_FIELD[enum_1.ENUM_FIELD.PASSWORD], { lang });
                const message = this.i18n.t(key, { args: { ...args, name }, lang });
                errors.push(message);
            }
        }
        if (errors.length) {
            throw new common_1.HttpException({
                errors,
                message: Status(common_1.HttpStatus.BAD_REQUEST),
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    ComparePassword(plainText, encryptedPass) {
        return bcrypt.compareSync(plainText, encryptedPass);
    }
    async MessageComparePassword(dto, user) {
        if (!this.ComparePassword(dto.current_password, user.password)) {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.WRONG_PASSWORD];
            const name = enum_1.I18N_FIELD[enum_1.ENUM_FIELD.PASSWORD];
            throw new common_1.HttpException(this.i18n.t(key, { args: { name: `$t(${name})` }, lang }), common_1.HttpStatus.BAD_REQUEST);
        }
        if (dto.new_password !== dto.confirm_password) {
            const { lang } = nestjs_i18n_1.I18nContext.current();
            const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.CONFIRM_PASSWORD_NOT_MATCH];
            const name = enum_1.I18N_FIELD[enum_1.ENUM_FIELD.CONFIRM_PASSWORD];
            throw new common_1.HttpException(this.i18n.t(key, { args: { name: `$t(${name})` }, lang }), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async Unique(field, entity, where) {
        const exist = await this.dataSource.getRepository(entity).findOne({
            where,
        });
        if (!exist)
            return;
        const { lang } = nestjs_i18n_1.I18nContext.current();
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.UNIQUE];
        const name = enum_1.I18N_FIELD[field];
        throw new common_1.HttpException(this.i18n.t(key, { args: { name: `$t(${name})` }, lang }), common_1.HttpStatus.BAD_REQUEST);
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)(enum_1.DB_NAME.DB_POSTGRES)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => nestjs_i18n_1.I18nService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_i18n_1.I18nService])
], BaseService);
//# sourceMappingURL=base.service.js.map