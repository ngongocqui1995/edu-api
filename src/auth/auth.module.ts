import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { BaseModule } from 'src/base/base.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/jwt-refresh-strategy';
import { TeachersModule } from 'src/modules/teachers/teachers.module';
import { StudentsModule } from 'src/modules/students/students.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<AppConfig['jwt']>('jwt');

        console.log(`Application is running jwt`);
        return {
          secret: jwt.accessToken.secret,
          signOptions: jwt.accessToken.signOptions,
        };
      },
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => TeachersModule),
    forwardRef(() => StudentsModule),
    forwardRef(() => BaseModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
