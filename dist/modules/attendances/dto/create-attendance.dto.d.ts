import { Class } from 'src/modules/classes/entities/class.entity';
import { Student } from 'src/modules/students/entities/student.entity';
export declare class CreateAttendanceDto {
    class: Class;
    student: Student;
    status: string;
}
