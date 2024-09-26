import { DataSource } from 'typeorm';
import { UsersService } from 'src/modules/users/users.service';
import { BaseService } from 'src/base/base.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { TeachersService } from 'src/modules/teachers/teachers.service';
import { StudentsService } from 'src/modules/students/students.service';
export declare class AuthService {
    private readonly dataSource;
    private readonly userService;
    private readonly teacherService;
    private readonly studentService;
    private readonly baseService;
    private readonly jwtService;
    private readonly configService;
    private readonly i18nService;
    constructor(dataSource: DataSource, userService: UsersService, teacherService: TeachersService, studentService: StudentsService, baseService: BaseService, jwtService: JwtService, configService: ConfigService, i18nService: I18nService);
    getUser(id: string): Promise<{
        role: string;
        id: string;
        email: string;
        password: string;
        name: string;
        gender: string;
        phone: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        role: string;
        id: string;
        email: string;
        password: string;
        name: string;
        gender: string;
        phone: string;
        classes: import("../modules/classes/entities/class.entity").Class[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        role: string;
        id: string;
        email: string;
        password: string;
        name: string;
        gender: string;
        phone: string;
        classes: import("../modules/classes/entities/class.entity").Class[];
        attendances: import("../modules/attendances/entities/attendance.entity").Attendance[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validateUser(username: string, password: string): Promise<{
        role: string;
        id: string;
        email: string;
        name: string;
        gender: string;
        phone: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        role: string;
        id: string;
        email: string;
        name: string;
        gender: string;
        phone: string;
        classes: import("../modules/classes/entities/class.entity").Class[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        role: string;
        id: string;
        email: string;
        name: string;
        gender: string;
        phone: string;
        classes: import("../modules/classes/entities/class.entity").Class[];
        attendances: import("../modules/attendances/entities/attendance.entity").Attendance[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: User): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
        message: unknown;
    }>;
    refreshToken(user: User & {
        iat: number;
        exp: number;
    }): Promise<{
        accessToken: string;
    }>;
}
