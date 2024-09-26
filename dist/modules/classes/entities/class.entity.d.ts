import { BaseEntity } from 'src/base/entities/base.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
export declare class Class extends BaseEntity {
    id: string;
    name: string;
    teacher: Teacher;
    attendances: Attendance[];
    status: string;
}
