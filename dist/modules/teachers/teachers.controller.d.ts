import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordTeacherDTO } from 'src/modules/teachers/dto/change-password-teacher.dto';
export declare class TeachersController implements CrudController<Teacher> {
    service: TeachersService;
    model_name: string;
    constructor(service: TeachersService);
    get base(): CrudController<Teacher>;
    getMany(req: CrudRequest): Promise<import("@nestjsx/crud").GetManyDefaultResponse<Teacher> | Teacher[]>;
    getOne(req: CrudRequest): Promise<Teacher>;
    updateOne(id: string, req: CrudRequest, dto: UpdateTeacherDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    replaceOne(id: string, req: CrudRequest, dto: UpdateTeacherDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    createOne(req: CrudRequest, dto: CreateTeacherDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changePassword(changePasswordDTO: ChangePasswordTeacherDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
}
