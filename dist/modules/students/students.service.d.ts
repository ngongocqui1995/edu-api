import { HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from 'src/modules/students/entities/student.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordStudentDTO } from 'src/modules/students/dto/change-password-teacher.dto';
export declare class StudentsService extends TypeOrmCrudService<Student> {
    readonly repo: Repository<Student>;
    private readonly dataSource;
    private readonly baseService;
    model_name: string;
    constructor(repo: Repository<Student>, dataSource: DataSource, baseService: BaseService);
    get base(): CrudService<Student>;
    validate(dto: UpdateStudentDto, id?: string): Promise<void>;
    replaceOneBase(id: string, req: CrudRequest, dto: UpdateStudentDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    updateOneBase(id: string, req: CrudRequest, dto: UpdateStudentDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    createOneBase(req: CrudRequest, dto: CreateStudentDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changePassword(changePasswordDTO: ChangePasswordStudentDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
}
