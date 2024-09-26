import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsExistValidator } from 'src/common/validators/exist-validator';
import { IsExistsValidator } from 'src/common/validators/exists-validator';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { LanguageModule } from 'src/language/language.module';
import { DatabaseModule } from 'src/database/database.module';
import { BaseModule } from 'src/base/base.module';
import { AuthModule } from 'src/auth/auth.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ClassesModule } from './modules/classes/classes.module';
import { StudentsModule } from './modules/students/students.module';
import { AttendancesModule } from './modules/attendances/attendances.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    LanguageModule,
    DatabaseModule,
    BaseModule,
    AuthModule,
    TeachersModule,
    ClassesModule,
    StudentsModule,
    AttendancesModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsExistValidator, IsExistsValidator],
})
export class AppModule {}
