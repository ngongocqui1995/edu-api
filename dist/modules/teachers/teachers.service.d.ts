import { HttpStatus } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordTeacherDTO } from 'src/modules/teachers/dto/change-password-teacher.dto';
export declare class TeachersService extends TypeOrmCrudService<Teacher> {
    readonly repo: Repository<Teacher>;
    private readonly dataSource;
    private readonly baseService;
    model_name: string;
    constructor(repo: Repository<Teacher>, dataSource: DataSource, baseService: BaseService);
    get base(): CrudService<Teacher>;
    validate(dto: UpdateTeacherDto, id?: string): Promise<void>;
    replaceOneBase(id: string, req: CrudRequest, dto: UpdateTeacherDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    updateOneBase(id: string, req: CrudRequest, dto: UpdateTeacherDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    createOneBase(req: CrudRequest, dto: CreateTeacherDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changePassword(changePasswordDTO: ChangePasswordTeacherDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
}
