import { HttpStatus } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
export declare class AttendancesService extends TypeOrmCrudService<Attendance> {
    readonly repo: Repository<Attendance>;
    private readonly dataSource;
    private readonly baseService;
    model_name: string;
    constructor(repo: Repository<Attendance>, dataSource: DataSource, baseService: BaseService);
    get base(): CrudService<Attendance>;
    replaceOneBase(id: string, req: CrudRequest, dto: UpdateAttendanceDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    updateOneBase(id: string, req: CrudRequest, dto: UpdateAttendanceDto): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    createOneBase(req: CrudRequest, dto: CreateAttendanceDto): Promise<{
        status: HttpStatus;
        data: Attendance;
        message: unknown;
    }>;
    deleteOneBase(req: CrudRequest): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
    changeStatus(id: string, changeStatusDTO: ChangeStatusDTO): Promise<{
        status: HttpStatus;
        message: unknown;
    }>;
}
