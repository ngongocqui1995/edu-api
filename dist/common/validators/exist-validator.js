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
exports.IsExistValidator = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum");
const typeorm_2 = require("typeorm");
let IsExistValidator = class IsExistValidator {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async validate(value, args) {
        if (!(0, class_validator_1.isUUID)(value))
            return false;
        const entity = args.constraints[0];
        const exist = await this.dataSource.getRepository(entity).findOne({
            where: { id: value },
        });
        if (exist)
            return true;
        return false;
    }
};
exports.IsExistValidator = IsExistValidator;
exports.IsExistValidator = IsExistValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)(enum_1.DB_NAME.DB_POSTGRES)),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], IsExistValidator);
//# sourceMappingURL=exist-validator.js.map