import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'src/common/decorators/validator.decorator';
import { ENUM_STATUS } from 'src/common/enum';

export class ChangeStatusDTO {
  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_STATUS)
  @ApiProperty({ enum: ENUM_STATUS, required: false })
  status: string;
}
