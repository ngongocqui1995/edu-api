import { BaseEntity } from 'src/base/entities/base.entity';
import { Class } from 'src/modules/classes/entities/class.entity';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
export declare class Student extends BaseEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    gender: string;
    phone: string;
    classes: Class[];
    attendances: Attendance[];
    status: string;
}
