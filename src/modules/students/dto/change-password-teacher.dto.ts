import { ApiProperty } from '@nestjs/swagger';
import {
  IsExist,
  IsNotEmpty,
  IsPassword,
  IsString,
} from 'src/common/decorators/validator.decorator';
import { Student } from 'src/modules/students/entities/student.entity';

export class ChangePasswordStudentDTO {
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
  @IsExist(Student)
  @ApiProperty({ type: String, required: false })
  student: string;
}
