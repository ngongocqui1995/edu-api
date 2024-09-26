import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { Class } from 'src/modules/classes/entities/class.entity';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
export declare class ClassesController implements CrudController<Class> {
    service: ClassesService;
    model_name: string;
    constructor(service: ClassesService);
    get base(): CrudController<Class>;
    getMany(req: CrudRequest): Promise<Class[] | import("@nestjsx/crud").GetManyDefaultResponse<Class>>;
    getOne(req: CrudRequest): Promise<Class>;
    updateOne(id: string, req: CrudRequest, dto: UpdateClassDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    replaceOne(id: string, req: CrudRequest, dto: UpdateClassDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    createOne(req: CrudRequest, dto: CreateClassDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
}
