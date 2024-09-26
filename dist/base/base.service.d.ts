import { I18nService } from 'nestjs-i18n';
import { ENUM_FIELD } from 'src/common/enum';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
export declare class BaseService {
    private readonly dataSource;
    private readonly i18n;
    constructor(dataSource: DataSource, i18n: I18nService);
    HashPassword(password: string): string;
    ValidatePassword(password: string): Promise<void>;
    ComparePassword(plainText: any, encryptedPass: any): boolean;
    MessageComparePassword(dto: {
        current_password?: string;
        new_password?: string;
        confirm_password?: string;
    }, user: User): Promise<void>;
    Unique(field: keyof typeof ENUM_FIELD, entity: any, where: FindOptionsWhere<any>): Promise<void>;
    ThrowError: (message: string) => void;
    ThrowUnauthorized: () => void;
    MessageLoginSuccess: () => unknown;
    MessageCreate: (modelName: string) => unknown;
    MessageUpdate: (modelName: string) => unknown;
    MessageDelete: (modelName: string) => unknown;
    MessageChangeStatus: (modelName: string) => unknown;
}
