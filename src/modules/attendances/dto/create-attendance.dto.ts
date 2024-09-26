import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsExist,
} from 'src/common/decorators/validator.decorator';
import { ENUM_STATUS } from 'src/common/enum';
import { Class } from 'src/modules/classes/entities/class.entity';
import { Student } from 'src/modules/students/entities/student.entity';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  @IsExist(Class)
  @ApiProperty({ type: String, required: true })
  class: Class;

  @IsString()
  @IsNotEmpty()
  @IsExist(Student)
  @ApiProperty({ type: String, required: true })
  student: Student;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_STATUS)
  @ApiProperty({ enum: ENUM_STATUS, required: false })
  status: string;
}
