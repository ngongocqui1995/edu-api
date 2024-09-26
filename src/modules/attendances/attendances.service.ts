import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  Param,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DB_NAME, ENUM_MODEL } from 'src/common/enum';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import {
  CrudRequest,
  CrudService,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import to from 'await-to-js';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';

@Injectable()
export class AttendancesService extends TypeOrmCrudService<Attendance> {
  model_name: string = ENUM_MODEL.ATTENDANCE;

  constructor(
    @InjectRepository(Attendance, DB_NAME.DB_POSTGRES)
    readonly repo: Repository<Attendance>,
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
  ) {
    super(repo);
  }

  get base(): CrudService<Attendance> {
    return this;
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateAttendanceDto,
  ) {
    const [err] = await to(
      this.replaceOne(req, dto as DeepPartial<Attendance>),
    );
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateAttendanceDto,
  ) {
    const [err] = await to(this.updateOne(req, dto as DeepPartial<Attendance>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateAttendanceDto,
  ) {
    const [err, res] = await to(
      this.createOne(req, dto as DeepPartial<Attendance>),
    );
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      data: res,
      message: this.baseService.MessageCreate(this.model_name),
    };
  }

  async deleteOneBase(@ParsedRequest() req: CrudRequest) {
    const [err] = await to(this.deleteOne(req));
    if (err) this.baseService.ThrowError(err.message);
    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageDelete(this.model_name),
    };
  }

  async changeStatus(id: string, changeStatusDTO: ChangeStatusDTO) {
    const [err] = await to(
      this.repo.update(id, { status: changeStatusDTO.status }),
    );
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageChangeStatus(this.model_name),
    };
  }
}
