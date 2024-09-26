import { Class } from 'src/modules/classes/entities/class.entity';
import { Student } from 'src/modules/students/entities/student.entity';
import { BaseEntity } from 'src/base/entities/base.entity';
export declare class Attendance extends BaseEntity {
    id: string;
    class: Class;
    student: Student;
    status: string;
    attendance_date: Date;
}
