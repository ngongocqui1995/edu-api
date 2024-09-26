import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
export declare class UsersService extends TypeOrmCrudService<User> {
    readonly repo: Repository<User>;
    private readonly dataSource;
    private readonly baseService;
    model_name: string;
    constructor(repo: Repository<User>, dataSource: DataSource, baseService: BaseService);
    get base(): CrudService<User>;
    validate(dto: UpdateUserDto, id?: string): Promise<void>;
    replaceOneBase(id: string, req: CrudRequest, dto: UpdateUserDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    updateOneBase(id: string, req: CrudRequest, dto: UpdateUserDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    createOneBase(req: CrudRequest, dto: CreateUserDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changePassword(req: any, changePasswordDTO: ChangePasswordDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
}
