import {
  Controller,
  Body,
  Param,
  UseGuards,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { BearerAuthName, ENUM_MODEL } from 'src/common/enum';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';
import { ChangePasswordTeacherDTO } from 'src/modules/teachers/dto/change-password-teacher.dto';

@Crud({
  model: {
    type: Teacher,
  },
  dto: {
    create: CreateTeacherDto,
    update: UpdateTeacherDto,
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase'],
  },
  query: {
    join: {
      classes: {
        allow: undefined,
      },
    },
    exclude: ['id'],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController implements CrudController<Teacher> {
  model_name: string = ENUM_MODEL.TEACHER;

  constructor(public service: TeachersService) {}

  get base(): CrudController<Teacher> {
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
    @ParsedBody() dto: UpdateTeacherDto,
  ) {
    return this.service.updateOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('replaceOneBase')
  replaceOne(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTeacherDto,
  ) {
    return this.service.replaceOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateTeacherDto,
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

  @Put('internal/change-password')
  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  async changePassword(@Body() changePasswordDTO: ChangePasswordTeacherDTO) {
    return this.service.changePassword(changePasswordDTO);
  }
}
