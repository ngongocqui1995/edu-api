import { forwardRef, Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { DB_NAME } from 'src/common/enum';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher], DB_NAME.DB_POSTGRES),
    forwardRef(() => BaseModule),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
