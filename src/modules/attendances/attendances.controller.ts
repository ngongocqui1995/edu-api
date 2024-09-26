import {
  Controller,
  Body,
  Param,
  UseGuards,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
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

@Crud({
  model: {
    type: Attendance,
  },
  dto: {
    create: CreateAttendanceDto,
    update: UpdateAttendanceDto,
  },
  routes: {
    exclude: ['createManyBase'],
  },
  query: {
    join: {
      class: {
        allow: undefined,
      },
      student: {
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
@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController implements CrudController<Attendance> {
  model_name: string = ENUM_MODEL.ATTENDANCE;

  constructor(public service: AttendancesService) {}

  get base(): CrudController<Attendance> {
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
    @ParsedBody() dto: UpdateAttendanceDto,
  ) {
    return this.service.updateOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('replaceOneBase')
  replaceOne(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateAttendanceDto,
  ) {
    return this.service.replaceOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateAttendanceDto,
  ) {
    return this.service.createOneBase(req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('deleteOneBase')
  deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.service.deleteOneBase(req);
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
}
