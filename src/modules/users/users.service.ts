import {
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Request,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DB_NAME, ENUM_FIELD, ENUM_MODEL } from 'src/common/enum';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { DataSource, DeepPartial, Not, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import {
  CrudRequest,
  CrudService,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import to from 'await-to-js';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  model_name: string = ENUM_MODEL.USER;

  constructor(
    @InjectRepository(User, DB_NAME.DB_POSTGRES)
    readonly repo: Repository<User>,
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
  ) {
    super(repo);
  }

  get base(): CrudService<User> {
    return this;
  }

  async validate(dto: UpdateUserDto, id?: string) {
    await this.baseService.Unique(ENUM_FIELD.EMAIL, User, {
      email: dto.email,
      ...(id && { id: Not(id) }),
    });

    await this.baseService.Unique(ENUM_FIELD.PHONE, User, {
      phone: dto.phone,
      ...(id && { id: Not(id) }),
    });
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateUserDto,
  ) {
    await this.validate(dto, id);

    const [err] = await to(this.replaceOne(req, dto as DeepPartial<User>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateUserDto,
  ) {
    await this.validate(dto, id);

    const [err] = await to(this.updateOne(req, dto as DeepPartial<User>));
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(this.model_name),
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateUserDto,
  ) {
    await this.validate(dto);

    // const encryptedPassword = this.baseService.HashPassword(dto.password);
    const [err] = await to(
      this.createOne(req, {
        ...dto,
        // password: encryptedPassword,
      } as DeepPartial<User>),
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

  async changePassword(@Request() req, changePasswordDTO: ChangePasswordDTO) {
    const user = await this.findOne({ where: { id: req.user.id } });

    await this.baseService.MessageComparePassword(changePasswordDTO, user);

    // const encryptedPassword = this.baseService.HashPassword(
    //   changePasswordDTO.new_password,
    // );
    const [err] = await to(
      this.repo.update(user.id, { password: changePasswordDTO.new_password }),
    );
    if (err) this.baseService.ThrowError(err.message);

    return {
      status: HttpStatus.OK,
      message: this.baseService.MessageUpdate(ENUM_FIELD.PASSWORD),
    };
  }
}
