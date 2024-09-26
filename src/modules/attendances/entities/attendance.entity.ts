import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_STATUS } from 'src/common/enum';
import { Class } from 'src/modules/classes/entities/class.entity';
import { Student } from 'src/modules/students/entities/student.entity';
import { BaseEntity } from 'src/base/entities/base.entity';

@Entity('attendances')
export class Attendance extends BaseEntity {
  @ApiProperty({ type: String, required: true })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_attendance_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({ type: String, required: true })
  @ManyToOne(() => Class, (l) => l.attendances, { nullable: false })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ApiProperty({ type: String, required: true })
  @ManyToOne(() => Student, (student) => student.attendances, {
    nullable: false,
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ApiProperty({ enum: ENUM_STATUS, required: false })
  @Column({
    type: 'varchar',
    nullable: false,
    default: ENUM_STATUS.ACTIVE,
    enum: ENUM_STATUS,
  })
  status: string;

  @ApiProperty({ type: String, required: false })
  @CreateDateColumn({ nullable: true })
  attendance_date: Date;
}
