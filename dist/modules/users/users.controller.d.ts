import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
export declare class UsersController implements CrudController<User> {
    service: UsersService;
    model_name: string;
    constructor(service: UsersService);
    get base(): CrudController<User>;
    getMany(req: CrudRequest): Promise<import("@nestjsx/crud").GetManyDefaultResponse<User> | User[]>;
    getOne(req: CrudRequest): Promise<User>;
    updateOne(id: string, req: CrudRequest, dto: UpdateUserDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    replaceOne(id: string, req: CrudRequest, dto: UpdateUserDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    createOne(req: CrudRequest, dto: CreateUserDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changePassword(req: any, changePasswordDTO: ChangePasswordDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
}
