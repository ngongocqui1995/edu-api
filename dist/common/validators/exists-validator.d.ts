import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { DataSource } from 'typeorm';
export declare class IsExistsValidator implements ValidatorConstraintInterface {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    validate(values: {
        id: string;
    }[], args: ValidationArguments): Promise<boolean>;
}
