import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DB_NAME, ENUM_STATUS } from 'src/common/enum';
import { DataSource } from 'typeorm';
import { UsersService } from 'src/modules/users/users.service';
import { BaseService } from 'src/base/base.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
import { I18nService } from 'nestjs-i18n';
import { TeachersService } from 'src/modules/teachers/teachers.service';
import { StudentsService } from 'src/modules/students/students.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @Inject(forwardRef(() => TeachersService))
    private readonly teacherService: TeachersService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentService: StudentsService,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly i18nService: I18nService,
  ) {}

  async getUser(id: string) {
    const user = await this.userService.findOne({ where: { id } });
    if (user) return { ...user, role: 'ROOT' };

    const teacher = await this.teacherService.findOne({ where: { id } });
    if (teacher) return { ...teacher, role: 'TEACHER' };

    const student = await this.studentService.findOne({ where: { id } });
    if (student) return { ...student, role: 'STUDENT' };

    return null;
  }

  async validateUser(username: string, password: string) {
    // await this.baseService.ValidatePassword(password);

    const user = await this.userService.findOne({
      where: [
        { email: username, status: ENUM_STATUS.ACTIVE },
        { phone: username, status: ENUM_STATUS.ACTIVE },
      ],
    });

    if (user && password === user.password) {
      const { password, ...result } = user;
      return { ...result, role: 'ROOT' };
    }

    const teacher = await this.teacherService.findOne({
      where: [
        { email: username, status: ENUM_STATUS.ACTIVE },
        { phone: username, status: ENUM_STATUS.ACTIVE },
      ],
    });

    if (teacher && password === teacher.password) {
      const { password, ...result } = teacher;
      return { ...result, role: 'TEACHER' };
    }

    const student = await this.studentService.findOne({
      where: [
        { email: username, status: ENUM_STATUS.ACTIVE },
        { phone: username, status: ENUM_STATUS.ACTIVE },
      ],
    });

    if (student && password === student.password) {
      const { password, ...result } = student;
      return { ...result, role: 'STUDENT' };
    }

    return null;
  }

  async login(user: User) {
    const jwt = this.configService.get<AppConfig['jwt']>('jwt');
    const payload = { id: user.id };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: jwt.refreshToken.secret,
        expiresIn: jwt.refreshToken.signOptions.expiresIn,
      }),
      message: this.baseService.MessageLoginSuccess(),
    };
  }

  async refreshToken(user: User & { iat: number; exp: number }) {
    const { iat, exp, ...payload } = user;
    return { accessToken: this.jwtService.sign(payload) };
  }
}
