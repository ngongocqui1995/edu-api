"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNumberString = IsNumberString;
exports.IsExist = IsExist;
exports.IsExists = IsExists;
exports.Min = Min;
exports.IsNumber = IsNumber;
exports.IsPassword = IsPassword;
exports.IsEmail = IsEmail;
exports.IsString = IsString;
exports.IsEnum = IsEnum;
exports.IsNotEmpty = IsNotEmpty;
exports.Length = Length;
const ClassValidator = require("class-validator");
const nestjs_i18n_1 = require("nestjs-i18n");
const enum_1 = require("../enum");
const exist_validator_1 = require("../validators/exist-validator");
const exists_validator_1 = require("../validators/exists-validator");
function IsNumberString(options, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_NUMBER_STRING];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: {
                validate: (value) => ClassValidator.isNumberString(value, options),
            },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsExist(entity, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_EXIST];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            constraints: [entity],
            validator: exist_validator_1.IsExistValidator,
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsExists(entity, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_EXIST];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            constraints: [entity],
            validator: exists_validator_1.IsExistsValidator,
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function Min(minValue, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.MIN];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            constraints: [minValue],
            validator: {
                validate: (value) => ClassValidator.min(value, minValue),
            },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsNumber(options, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_NUMBER];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: {
                validate: (value) => ClassValidator.isNumber(value, options),
            },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsPassword(validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_PASSWORD];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        const pattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: {
                validate: (value) => ClassValidator.matches(value, pattern),
            },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsEmail(options, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_EMAIL];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: {
                validate: (value) => ClassValidator.isEmail(value, options),
            },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsString(validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_STRING];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: { validate: (value) => ClassValidator.isString(value) },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function IsEnum(entity, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_ENUM];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: {
                validate: (value) => ClassValidator.isEnum(value, entity),
            },
            constraints: [entity, Object.keys(entity)],
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})`, values: Object.keys(entity).join(', ') }),
                ...validationOptions,
            },
        });
    };
}
function IsNotEmpty(validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.IS_NOT_EMPTY];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            validator: { validate: (value) => ClassValidator.isNotEmpty(value) },
            options: {
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
function Length(min, max, validationOptions) {
    return function (object, propertyName) {
        const key = enum_1.I18N_VALIDATOR[enum_1.ENUM_VALIDATOR.LENGTH];
        const name = enum_1.I18N_FIELD[propertyName.toUpperCase()];
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
                message: (0, nestjs_i18n_1.i18nValidationMessage)(key, { name: `$t(${name})` }),
                ...validationOptions,
            },
        });
    };
}
//# sourceMappingURL=validator.decorator.js.map