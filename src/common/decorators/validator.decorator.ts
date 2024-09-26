import * as ClassValidator from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { I18N_VALIDATOR, ENUM_VALIDATOR, I18N_FIELD } from '../enum';
import { PathImpl2 } from '@nestjs/config';
import * as ValidatorJS from 'validator';
import { IsExistValidator } from '../validators/exist-validator';
import { IsExistsValidator } from '../validators/exists-validator';

export function IsNumberString(
  options?: ValidatorJS.IsNumericOptions,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_NUMBER_STRING];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: {
        validate: (value) => ClassValidator.isNumberString(value, options),
      },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsExist(
  entity: any,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_EXIST];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [entity],
      validator: IsExistValidator,
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsExists(
  entity: any,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_EXIST];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [entity],
      validator: IsExistsValidator,
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function Min(
  minValue: number,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.MIN];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [minValue],
      validator: {
        validate: (value) => ClassValidator.min(value, minValue),
      },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsNumber(
  options?: ClassValidator.IsNumberOptions,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_NUMBER];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: {
        validate: (value) => ClassValidator.isNumber(value, options),
      },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsPassword(
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_PASSWORD];
    const name = I18N_FIELD[propertyName.toUpperCase()];
    const pattern =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: {
        validate: (value) => ClassValidator.matches(value, pattern),
      },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsEmail(
  options?: ValidatorJS.IsEmailOptions,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_EMAIL];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: {
        validate: (value) => ClassValidator.isEmail(value, options),
      },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsString(validationOptions?: ClassValidator.ValidationOptions) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_STRING];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: { validate: (value) => ClassValidator.isString(value) },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsEnum(
  entity: any,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_ENUM];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: {
        validate: (value) => ClassValidator.isEnum(value, entity),
      },
      constraints: [entity, Object.keys(entity)],
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})`, values: Object.keys(entity).join(', ') },
        ),
        ...validationOptions,
      },
    });
  };
}

export function IsNotEmpty(
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.IS_NOT_EMPTY];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      validator: { validate: (value) => ClassValidator.isNotEmpty(value) },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}

export function Length(
  min: number,
  max: number,
  validationOptions?: ClassValidator.ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const key = I18N_VALIDATOR[ENUM_VALIDATOR.LENGTH];
    const name = I18N_FIELD[propertyName.toUpperCase()];

    ClassValidator.registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [min, max],
      validator: {
        validate: (value) => {
          return ClassValidator.length(value, min, max);
        },
      },
      options: {
        message: i18nValidationMessage<I18nTranslations>(
          key as PathImpl2<I18nTranslations>,
          { name: `$t(${name})` },
        ),
        ...validationOptions,
      },
    });
  };
}
