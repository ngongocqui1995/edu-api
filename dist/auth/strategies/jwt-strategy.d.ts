import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: {
        id: string;
    }): Promise<{
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
        classes: import("../../modules/classes/entities/class.entity").Class[];
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
        classes: import("../../modules/classes/entities/class.entity").Class[];
        attendances: import("../../modules/attendances/entities/attendance.entity").Attendance[];
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
