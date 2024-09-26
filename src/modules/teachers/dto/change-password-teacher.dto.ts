import { ApiProperty } from '@nestjs/swagger';
import {
  IsExist,
  IsNotEmpty,
  IsPassword,
  IsString,
} from 'src/common/decorators/validator.decorator';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';

export class ChangePasswordTeacherDTO {
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  @ApiProperty({ type: String, required: true })
  new_password: string;

  @IsString()
  @IsNotEmpty()
  @IsPassword()
  @ApiProperty({ type: String, required: true })
  confirm_password: string;

  @IsString()
  @IsNotEmpty()
  @IsExist(Teacher)
  @ApiProperty({ type: String, required: false })
  teacher: string;
}
