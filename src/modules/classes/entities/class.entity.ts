import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_STATUS } from 'src/common/enum';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';

@Entity('classes')
export class Class extends BaseEntity {
  @ApiProperty({ type: String, required: true })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_class_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({ type: String, minLength: 3, maxLength: 50, required: true })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ApiProperty({ type: String, required: false })
  @ManyToOne(() => Teacher, (teacher) => teacher.classes, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Attendance, (attendance) => attendance.class)
  attendances: Attendance[];

  @ApiProperty({ enum: ENUM_STATUS, required: false })
  @Column({
    type: 'varchar',
    nullable: false,
    default: ENUM_STATUS.ACTIVE,
    enum: ENUM_STATUS,
  })
  status: string;
}
