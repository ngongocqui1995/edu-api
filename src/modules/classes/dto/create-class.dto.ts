import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  Length,
  IsExist,
} from 'src/common/decorators/validator.decorator';
import { ENUM_STATUS } from 'src/common/enum';
import { Student } from 'src/modules/students/entities/student.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({ type: String, minLength: 3, maxLength: 50, required: true })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsExist(Teacher)
  @ApiProperty({ type: String, required: false })
  teacher: Teacher;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsExist(Student)
  @ApiProperty({ type: String, required: false })
  student: Student;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_STATUS)
  @ApiProperty({ enum: ENUM_STATUS, required: false })
  status: string;
}
