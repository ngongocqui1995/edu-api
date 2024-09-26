import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  Param,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from 'src/modules/students/entities/student.entity';
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
import { ChangePasswordStudentDTO } from 'src/modules/students/dto/change-password-teacher.dto';

@Injectable()
export class StudentsService extends TypeOrmCrudService<Student> {
  model_name: string = ENUM_MODEL.STUDENT;

  constructor(
    @InjectRepository(Student, DB_NAME.DB_POSTGRES)
    readonly repo: Repository<Student>,
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
  ) {
    super(repo);
  }

  get base(): CrudService<Student> {
    return this;
  }

  async validate(dto: UpdateStudentDto, id?: string) {
    await this.baseService.Unique(ENUM_FIELD.EMAIL, Student, {
      email: dto.email,
      ...(id && { id: Not(id) }),
    });

    await this.baseService.Unique(ENUM_FIELD.PHONE, Student, {
      phone: dto.phone,
      ...(id && { id: Not(id) }),
    });
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateStudentDto,
  ) {
    await this.validate(dto, id);

    const [err] = await to(this.replaceOne(req, dto as DeepPartial<Student>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateStudentDto,
  ) {
    await this.validate(dto, id);

    const [err] = await to(this.updateOne(req, dto as DeepPartial<Student>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateStudentDto,
  ) {
    await this.validate(dto);

    // const encryptedPassword = this.baseService.HashPassword(dto.password);
    const [err] = await to(
      this.createOne(req, {
        ...dto,
        // password: encryptedPassword,
      } as DeepPartial<Student>),
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

  async changePassword(changePasswordDTO: ChangePasswordStudentDTO) {
    // const encryptedPassword = this.baseService.HashPassword(
    //   changePasswordDTO.new_password,
    // );
    const [err] = await to(
      this.repo.update(changePasswordDTO.student, {
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
