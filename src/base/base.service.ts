import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  DB_NAME,
  ENUM_FIELD,
  ENUM_MESSAGE,
  ENUM_VALIDATOR,
  I18N_FIELD,
  I18N_MESSAGE,
  I18N_MODEL,
  I18N_VALIDATOR,
} from 'src/common/enum';
import { DataSource, FindOptionsWhere } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { ChangePasswordDTO } from 'src/modules/users/dto/change-password.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { validate } from 'class-validator';
import * as Status from 'statuses';

@Injectable()
export class BaseService {
  constructor(
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => I18nService))
    private readonly i18n: I18nService,
  ) {}

  HashPassword(password: string): string {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async ValidatePassword(password: string) {
    const { lang } = I18nContext.current();

    const createUser = new CreateUserDto();
    createUser.password = password;
    const validationErrors = await validate(createUser, {
      skipMissingProperties: true,
    });

    const errors = [];
    for (const validationError of validationErrors) {
      for (const constraint of Object.values(validationError.constraints)) {
        const constraints = constraint.split('|');
        const key = constraints[0] ?? '';
        const args = constraints[1] ?? JSON.parse(constraints[1]);
        const name = this.i18n.t(I18N_FIELD[ENUM_FIELD.PASSWORD], { lang });

        const message = this.i18n.t(key, { args: { ...args, name }, lang });
        errors.push(message);
      }
    }

    if (errors.length) {
      throw new HttpException(
        {
          errors,
          message: Status(HttpStatus.BAD_REQUEST),
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  ComparePassword(plainText, encryptedPass): boolean {
    return bcrypt.compareSync(plainText, encryptedPass);
  }

  async MessageComparePassword(
    dto: {
      current_password?: string;
      new_password?: string;
      confirm_password?: string;
    },
    user: User,
  ): Promise<void> {
    if (!this.ComparePassword(dto.current_password, user.password)) {
      const { lang } = I18nContext.current();
      const key = I18N_VALIDATOR[ENUM_VALIDATOR.WRONG_PASSWORD];
      const name = I18N_FIELD[ENUM_FIELD.PASSWORD];

      throw new HttpException(
        this.i18n.t(key, { args: { name: `$t(${name})` }, lang }),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.new_password !== dto.confirm_password) {
      const { lang } = I18nContext.current();
      const key = I18N_VALIDATOR[ENUM_VALIDATOR.CONFIRM_PASSWORD_NOT_MATCH];
      const name = I18N_FIELD[ENUM_FIELD.CONFIRM_PASSWORD];

      throw new HttpException(
        this.i18n.t(key, { args: { name: `$t(${name})` }, lang }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async Unique(
    field: keyof typeof ENUM_FIELD,
    entity: any,
    where: FindOptionsWhere<any>,
  ): Promise<void> {
    const exist = await this.dataSource.getRepository(entity).findOne({
      where,
    });
    if (!exist) return;

    const { lang } = I18nContext.current();
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.UNIQUE];
    const name = I18N_FIELD[field];

    throw new HttpException(
      this.i18n.t(key, { args: { name: `$t(${name})` }, lang }),
      HttpStatus.BAD_REQUEST,
    );
  }

  ThrowError = (message: string): void => {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  };

  ThrowUnauthorized = (): void => {
    const { lang } = I18nContext.current();
    const key = I18N_MESSAGE[ENUM_MESSAGE.UNAUTHORIZED];
    const message = this.i18n.t(key, { lang });

    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  };

  MessageLoginSuccess = () => {
    const { lang } = I18nContext.current();
    const key = I18N_MESSAGE[ENUM_MESSAGE.AUTHORIZED];

    return this.i18n.t(key, { lang });
  };

  MessageCreate = (modelName: string) => {
    const { lang } = I18nContext.current();
    const key = I18N_MESSAGE[ENUM_MESSAGE.CREATE];
    const name = I18N_MODEL[modelName] || I18N_FIELD[modelName];

    return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
  };

  MessageUpdate = (modelName: string) => {
    const { lang } = I18nContext.current();
    const key = I18N_MESSAGE[ENUM_MESSAGE.UPDATE];
    const name = I18N_MODEL[modelName] || I18N_FIELD[modelName];

    return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
  };

  MessageDelete = (modelName: string) => {
    const { lang } = I18nContext.current();
    const key = I18N_MESSAGE[ENUM_MESSAGE.DELETE];
    const name = I18N_MODEL[modelName] || I18N_FIELD[modelName];

    return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
  };

  MessageChangeStatus = (modelName: string) => {
    const { lang } = I18nContext.current();
    const key = I18N_MESSAGE[ENUM_MESSAGE.CHANGE_STATUS];
    const name = I18N_MODEL[modelName] || I18N_FIELD[modelName];

    return this.i18n.t(key, { args: { name: `$t(${name})` }, lang });
  };
}
