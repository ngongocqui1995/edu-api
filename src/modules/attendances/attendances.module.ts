import { forwardRef, Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { Attendance } from 'src/modules/attendances/entities/attendance.entity';
import { DB_NAME } from 'src/common/enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance], DB_NAME.DB_POSTGRES),
    forwardRef(() => BaseModule),
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService],
  exports: [AttendancesService],
})
export class AttendancesModule {}
