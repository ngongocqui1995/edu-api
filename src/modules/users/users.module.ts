import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { DB_NAME } from 'src/common/enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], DB_NAME.DB_POSTGRES),
    forwardRef(() => BaseModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
