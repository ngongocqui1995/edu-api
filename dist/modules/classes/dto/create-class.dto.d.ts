import { Student } from 'src/modules/students/entities/student.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
export declare class CreateClassDto {
    name: string;
    teacher: Teacher;
    student: Student;
    status: string;
}
