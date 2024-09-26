import { HttpStatus } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Class } from 'src/modules/classes/entities/class.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
export declare class ClassesService extends TypeOrmCrudService<Class> {
    readonly repo: Repository<Class>;
    private readonly dataSource;
    private readonly baseService;
    model_name: string;
    constructor(repo: Repository<Class>, dataSource: DataSource, baseService: BaseService);
    get base(): CrudService<Class>;
    replaceOneBase(id: string, req: CrudRequest, dto: UpdateClassDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    updateOneBase(id: string, req: CrudRequest, dto: UpdateClassDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    createOneBase(req: CrudRequest, dto: CreateClassDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
}
