import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Request,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DB_NAME, ENUM_FIELD, ENUM_MODEL } from 'src/common/enum';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Not, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import {
  CrudRequest,
  CrudService,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import to from 'await-to-js';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordDTO } from 'src/modules/users/dto/change-password.dto';
import { ChangePasswordTeacherDTO } from 'src/modules/teachers/dto/change-password-teacher.dto';

@Injectable()
export class TeachersService extends TypeOrmCrudService<Teacher> {
  model_name: string = ENUM_MODEL.TEACHER;

  constructor(
    @InjectRepository(Teacher, DB_NAME.DB_POSTGRES)
    readonly repo: Repository<Teacher>,
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
  ) {
    super(repo);
  }

  get base(): CrudService<Teacher> {
    return this;
  }

  async validate(dto: UpdateTeacherDto, id?: string) {
    await this.baseService.Unique(ENUM_FIELD.EMAIL, Teacher, {
      email: dto.email,
      ...(id && { id: Not(id) }),
    });

    await this.baseService.Unique(ENUM_FIELD.PHONE, Teacher, {
      phone: dto.phone,
      ...(id && { id: Not(id) }),
    });
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTeacherDto,
  ) {
    await this.validate(dto, id);

    const [err] = await to(this.replaceOne(req, dto as DeepPartial<Teacher>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTeacherDto,
  ) {
    await this.validate(dto, id);

    console.log(dto);
    const [err] = await to(this.updateOne(req, dto as DeepPartial<Teacher>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateTeacherDto,
  ) {
    await this.validate(dto);

    // const encryptedPassword = this.baseService.HashPassword(dto.password);
    const [err] = await to(
      this.createOne(req, {
        ...dto,
        // password: encryptedPassword,
      } as DeepPartial<Teacher>),
    );
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

  async changePassword(changePasswordDTO: ChangePasswordTeacherDTO) {
    // const encryptedPassword = this.baseService.HashPassword(
    //   changePasswordDTO.new_password,
    // );
    const [err] = await to(
      this.repo.update(changePasswordDTO.teacher, {
        password: changePasswordDTO.new_password,
      }),
    );
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(ENUM_FIELD.PASSWORD),
    };
  }
}
