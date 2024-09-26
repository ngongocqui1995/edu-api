import { BaseEntity } from 'src/base/entities/base.entity';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    gender: string;
    phone: string;
    status: string;
}
