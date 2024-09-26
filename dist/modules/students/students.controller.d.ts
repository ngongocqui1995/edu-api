import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from 'src/modules/students/entities/student.entity';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordStudentDTO } from 'src/modules/students/dto/change-password-teacher.dto';
export declare class StudentsController implements CrudController<Student> {
    service: StudentsService;
    model_name: string;
    constructor(service: StudentsService);
    get base(): CrudController<Student>;
    getMany(req: CrudRequest): Promise<import("@nestjsx/crud").GetManyDefaultResponse<Student> | Student[]>;
    getOne(req: CrudRequest): Promise<Student>;
    updateOne(id: string, req: CrudRequest, dto: UpdateStudentDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    replaceOne(id: string, req: CrudRequest, dto: UpdateStudentDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    createOne(req: CrudRequest, dto: CreateStudentDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changePassword(changePasswordDTO: ChangePasswordStudentDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
}
