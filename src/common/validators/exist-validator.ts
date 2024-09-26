import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isUUID,
} from 'class-validator';
import { DB_NAME } from '../enum';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
  ) {}

  async validate(value: string, args: ValidationArguments) {
    if (!isUUID(value)) return false;

    const entity = args.constraints[0];
    const exist = await this.dataSource.getRepository(entity).findOne({
      where: { id: value },
    });

    if (exist) return true;
    return false;
  }
}
