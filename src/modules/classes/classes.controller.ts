import {
  Controller,
  Body,
  Param,
  UseGuards,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Class } from 'src/modules/classes/entities/class.entity';
import { BearerAuthName, ENUM_MODEL } from 'src/common/enum';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangeStatusDTO } from 'src/base/dto/update-status.dto';

@Crud({
  model: {
    type: Class,
  },
  dto: {
    create: CreateClassDto,
    update: UpdateClassDto,
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase'],
  },
  query: {
    join: {
      teacher: {
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
@ApiTags('Classes')
@Controller('classes')
export class ClassesController implements CrudController<Class> {
  model_name: string = ENUM_MODEL.CLASS;

  constructor(public service: ClassesService) {}

  get base(): CrudController<Class> {
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
    @ParsedBody() dto: UpdateClassDto,
  ) {
    return this.service.updateOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override('replaceOneBase')
  replaceOne(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateClassDto,
  ) {
    return this.service.replaceOneBase(id, req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth(BearerAuthName)
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateClassDto,
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
}
