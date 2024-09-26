import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ENUM_GENDER, ENUM_STATUS } from 'src/common/enum';
import { BaseEntity } from 'src/base/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ type: String, required: true })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_user_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({ type: String, minLength: 5, maxLength: 100, required: true })
  @Column({ type: 'varchar', unique: true, nullable: false, length: 100 })
  email: string;

  @ApiProperty({ type: String, required: true })
  @Column({ type: 'varchar', nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ type: String, minLength: 3, maxLength: 50, required: true })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ApiProperty({ enum: ENUM_GENDER, required: false })
  @Column({
    type: 'varchar',
    nullable: false,
    default: ENUM_GENDER.OTHER,
    enum: ENUM_GENDER,
  })
  gender: string;

  @ApiProperty({ type: String, required: false })
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ApiProperty({ enum: ENUM_STATUS, required: false })
  @Column({
    type: 'varchar',
    nullable: false,
    default: ENUM_STATUS.ACTIVE,
    enum: ENUM_STATUS,
  })
  status: string;
}
