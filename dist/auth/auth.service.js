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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../common/enum");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../modules/users/users.service");
const base_service_1 = require("../base/base.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const nestjs_i18n_1 = require("nestjs-i18n");
const teachers_service_1 = require("../modules/teachers/teachers.service");
const students_service_1 = require("../modules/students/students.service");
let AuthService = class AuthService {
    constructor(dataSource, userService, teacherService, studentService, baseService, jwtService, configService, i18nService) {
        this.dataSource = dataSource;
        this.userService = userService;
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.baseService = baseService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.i18nService = i18nService;
    }
    async getUser(id) {
        const user = await this.userService.findOne({ where: { id } });
        if (user)
            return { ...user, role: 'ROOT' };
        const teacher = await this.teacherService.findOne({ where: { id } });
        if (teacher)
            return { ...teacher, role: 'TEACHER' };
        const student = await this.studentService.findOne({ where: { id } });
        if (student)
            return { ...student, role: 'STUDENT' };
        return null;
    }
    async validateUser(username, password) {
        await this.baseService.ValidatePassword(password);
        const user = await this.userService.findOne({
            where: [
                { email: username, status: enum_1.ENUM_STATUS.ACTIVE },
                { phone: username, status: enum_1.ENUM_STATUS.ACTIVE },
            ],
        });
        if (user && password === user.password) {
            const { password, ...result } = user;
            return { ...result, role: 'ROOT' };
        }
        const teacher = await this.teacherService.findOne({
            where: [
                { email: username, status: enum_1.ENUM_STATUS.ACTIVE },
                { phone: username, status: enum_1.ENUM_STATUS.ACTIVE },
            ],
        });
        if (teacher && password === teacher.password) {
            const { password, ...result } = teacher;
            return { ...result, role: 'TEACHER' };
        }
        const student = await this.studentService.findOne({
            where: [
                { email: username, status: enum_1.ENUM_STATUS.ACTIVE },
                { phone: username, status: enum_1.ENUM_STATUS.ACTIVE },
            ],
        });
        if (student && password === student.password) {
            const { password, ...result } = student;
            return { ...result, role: 'STUDENT' };
        }
        return null;
    }
    async login(user) {
        const jwt = this.configService.get('jwt');
        const payload = { id: user.id };
        return {
            user,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {
                secret: jwt.refreshToken.secret,
                expiresIn: jwt.refreshToken.signOptions.expiresIn,
            }),
            message: this.baseService.MessageLoginSuccess(),
        };
    }
    async refreshToken(user) {
        const { iat, exp, ...payload } = user;
        return { accessToken: this.jwtService.sign(payload) };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)(enum_1.DB_NAME.DB_POSTGRES)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => teachers_service_1.TeachersService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => students_service_1.StudentsService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => base_service_1.BaseService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        users_service_1.UsersService,
        teachers_service_1.TeachersService,
        students_service_1.StudentsService,
        base_service_1.BaseService,
        jwt_1.JwtService,
        config_1.ConfigService,
        nestjs_i18n_1.I18nService])
], AuthService);
//# sourceMappingURL=auth.service.js.map