import { Class } from 'src/modules/classes/entities/class.entity';
export declare class CreateStudentDto {
    email: string;
    password: string;
    name: string;
    phone: string;
    classes: Class[];
    gender: string;
    status: string;
}
