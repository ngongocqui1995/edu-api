import { AuthService } from '../auth.service';
import { BaseService } from 'src/base/base.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private readonly baseService;
    constructor(authService: AuthService, baseService: BaseService);
    validate(username: string, password: string): Promise<{
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
        classes: import("../../modules/classes/entities/class.entity").Class[];
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
        classes: import("../../modules/classes/entities/class.entity").Class[];
        attendances: import("../../modules/attendances/entities/attendance.entity").Attendance[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
