import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsPassword,
  IsNumberString,
  IsExists,
} from 'src/common/decorators/validator.decorator';
import { ENUM_GENDER, ENUM_STATUS } from 'src/common/enum';
import { Class } from 'src/modules/classes/entities/class.entity';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 100)
  @Transform((params) => String(params.value).trim())
  @ApiProperty({ type: String, minLength: 5, maxLength: 100, required: true })
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  @Length(5, 100)
  @ApiProperty({
    type: String,
    required: true,
    description:
      'Mật khẩu phải 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự đặc biệt!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({ type: String, minLength: 3, maxLength: 50, required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  @Transform((params) => String(params.value).trim())
  @ApiProperty({ type: String, minLength: 10, maxLength: 10, required: true })
  phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_GENDER)
  @ApiProperty({ type: String, required: false })
  gender: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @IsExists(Class)
  @ApiProperty({ type: String, required: false })
  classes: Class[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_STATUS)
  @ApiProperty({ enum: ENUM_STATUS, required: false })
  status: string;
}
