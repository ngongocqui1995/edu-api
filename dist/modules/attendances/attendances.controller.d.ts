import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
export declare class AttendancesController implements CrudController<Attendance> {
    service: AttendancesService;
    model_name: string;
    constructor(service: AttendancesService);
    get base(): CrudController<Attendance>;
    getMany(req: CrudRequest): Promise<Attendance[] | import("@nestjsx/crud").GetManyDefaultResponse<Attendance>>;
    getOne(req: CrudRequest): Promise<Attendance>;
    updateOne(id: string, req: CrudRequest, dto: UpdateAttendanceDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    replaceOne(id: string, req: CrudRequest, dto: UpdateAttendanceDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    createOne(req: CrudRequest, dto: CreateAttendanceDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: Attendance;
        message: unknown;
    }>;
    deleteOne(req: CrudRequest): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: unknown;
    }>;
}
