import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { DataSource } from 'typeorm';
export declare class IsExistValidator implements ValidatorConstraintInterface {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    validate(value: string, args: ValidationArguments): Promise<boolean>;
}
