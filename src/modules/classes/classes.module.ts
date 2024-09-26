import { forwardRef, Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { BaseModule } from 'src/base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/modules/classes/entities/class.entity';
import { DB_NAME } from 'src/common/enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class], DB_NAME.DB_POSTGRES),
    forwardRef(() => BaseModule),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
