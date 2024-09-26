import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isUUID,
} from 'class-validator';
import { DB_NAME } from '../enum';
import { DataSource, In } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistsValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource(DB_NAME.DB_POSTGRES)
    private readonly dataSource: DataSource,
  ) {}

  async validate(values: { id: string }[], args: ValidationArguments) {
    const valueIds = values.map((value) => value.id);
    if (valueIds.some((value) => !isUUID(value))) return false;

    const entity = args.constraints[0];
    const exists = await this.dataSource.getRepository(entity).find({
      where: { id: In(valueIds) },
    });

    if (exists.length === valueIds.length) return true;
    return false;
  }
}
