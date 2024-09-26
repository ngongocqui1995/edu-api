import {
  Controller,
  Body,
  Param,
  UseGuards,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Student } from 'src/modules/students/entities/student.entity';
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
import { ChangePasswordStudentDTO } from 'src/modules/students/dto/change-password-teacher.dto';

@Crud({
  model: {
    type: Student,
  },
  dto: {
    create: CreateStudentDto,
    update: UpdateStudentDto,
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase'],
  },
  query: {
    join: {
      classes: {
        allow: undefined,
      },
      'classes.teacher': {
        allow: undefined,
      },
      attendances: {
        allow: undefined,
      },
      'attendances.class': {
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
@ApiTags('Students')
@Controller('students')
export class StudentsController implements CrudController<Student> {
  model_name: string = ENUM_MODEL.TEACHER;

  constructor(public service: StudentsService) {}

  get base(): CrudController<Student> {
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
    @ParsedBody() dto: UpdateStudentDto,
  ) {
    return this.service.updateOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('replaceOneBase')
  replaceOne(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateStudentDto,
  ) {
    return this.service.replaceOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateStudentDto,
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
  async changePassword(@Body() changePasswordDTO: ChangePasswordStudentDTO) {
    return this.service.changePassword(changePasswordDTO);
  }
}
