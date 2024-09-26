import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPassword,
  IsString,
} from 'src/common/decorators/validator.decorator';

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  @ApiProperty({ type: String, required: true })
  current_password: string;

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
}
