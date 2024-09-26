import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { BearerAuthName, ENUM_MODEL } from 'src/common/enum';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase'],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@ApiTags('Users')
@Controller('users')
export class UsersController implements CrudController<User> {
  model_name: string = ENUM_MODEL.USER;

  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override()
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('getOneBase')
  getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('updateOneBase')
  updateOne(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateUserDto,
  ) {
    return this.service.updateOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('replaceOneBase')
  replaceOne(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateUserDto,
  ) {
    return this.service.replaceOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateUserDto,
  ) {
    return this.service.createOneBase(req, dto);
  }

  @Put('status/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @ApiParam({ required: true, name: 'id', type: String })
  async changeStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) changeStatusDTO: ChangeStatusDTO,
  ) {
    return this.service.changeStatus(id, changeStatusDTO);
  }

  @Put('change-password')
  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  async changePassword(
    @Request() req,
    @Body(ValidationPipe) changePasswordDTO: ChangePasswordDTO,
  ) {
    return this.service.changePassword(req, changePasswordDTO);
  }
}
