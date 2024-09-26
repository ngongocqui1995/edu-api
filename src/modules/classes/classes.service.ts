import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  Param,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Class } from 'src/modules/classes/entities/class.entity';
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
export class ClassesService extends TypeOrmCrudService<Class> {
  model_name: string = ENUM_MODEL.CLASS;

  constructor(
    @InjectRepository(Class, DB_NAME.DB_POSTGRES)
    readonly repo: Repository<Class>,
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
  ) {
    super(repo);
  }

  get base(): CrudService<Class> {
    return this;
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateClassDto,
  ) {
    const [err] = await to(this.replaceOne(req, dto as DeepPartial<Class>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateClassDto,
  ) {
    const [err] = await to(this.updateOne(req, dto as DeepPartial<Class>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateClassDto,
  ) {
    const [err] = await to(this.createOne(req, dto as DeepPartial<Class>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageCreate(this.model_name),
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
