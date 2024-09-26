import { BaseEntity } from 'src/base/entities/base.entity';
import { Class } from 'src/modules/classes/entities/class.entity';
export declare class Teacher extends BaseEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    gender: string;
    phone: string;
    classes: Class[];
    status: string;
}
