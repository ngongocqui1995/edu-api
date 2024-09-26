import { Class } from 'src/modules/classes/entities/class.entity';
export declare class CreateTeacherDto {
    email: string;
    password: string;
    name: string;
    phone: string;
    gender: string;
    classes: Class[];
    status: string;
}
