import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { Student } from 'src/modules/students/entities/student.entity';
import { DB_NAME } from 'src/common/enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student], DB_NAME.DB_POSTGRES),
    forwardRef(() => BaseModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
