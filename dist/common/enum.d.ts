export declare enum DB_NAME {
    DB_POSTGRES = "DB_POSTGRES"
}
export declare const BearerAuthName = "JWT";
export declare enum STATUS_UPLOAD {
    INIT = "INIT",
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}
export declare enum ENUM_STATUS {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    INIT = "INIT"
}
export declare enum ENUM_MODEL {
    AUTH = "AUTH",
    USER = "USER",
    TEACHER = "TEACHER",
    CLASS = "CLASS",
    STUDENT = "STUDENT",
    ATTENDANCE = "ATTENDANCE"
}
export declare const I18N_MODEL: {
    AUTH: string;
    USER: string;
    TEACHER: string;
    CLASS: string;
    STUDENT: string;
    ATTENDANCE: string;
};
export declare enum ENUM_VALIDATOR {
    IS_STRING = "IS_STRING",
    IS_NOT_EMPTY = "IS_NOT_EMPTY",
    LENGTH = "LENGTH",
    IS_IN = "IS_IN",
    IS_ENUM = "IS_ENUM",
    UNIQUE = "UNIQUE",
    IS_EMAIL = "IS_EMAIL",
    IS_PASSWORD = "IS_PASSWORD",
    IS_NUMBER = "IS_NUMBER",
    MIN = "MIN",
    IS_EXIST = "IS_EXIST",
    IS_NUMBER_STRING = "IS_NUMBER_STRING",
    WRONG_PASSWORD = "WRONG_PASSWORD",
    CONFIRM_PASSWORD_NOT_MATCH = "CONFIRM_PASSWORD_NOT_MATCH"
}
export declare const I18N_VALIDATOR: {
    IS_STRING: string;
    IS_NOT_EMPTY: string;
    LENGTH: string;
    IS_ENUM: string;
    UNIQUE: string;
    IS_EMAIL: string;
    IS_PASSWORD: string;
    IS_NUMBER: string;
    MIN: string;
    IS_EXIST: string;
    IS_NUMBER_STRING: string;
    WRONG_PASSWORD: string;
    CONFIRM_PASSWORD_NOT_MATCH: string;
};
export declare enum ENUM_MESSAGE {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    CHANGE_STATUS = "CHANGE_STATUS",
    UNAUTHORIZED = "UNAUTHORIZED",
    AUTHORIZED = "AUTHORIZED"
}
export declare const I18N_MESSAGE: {
    CREATE: string;
    UPDATE: string;
    DELETE: string;
    CHANGE_STATUS: string;
    UNAUTHORIZED: string;
    AUTHORIZED: string;
};
export declare enum ENUM_FIELD {
    CODE = "CODE",
    AVATAR = "AVATAR",
    NAME = "NAME",
    COLOR = "COLOR",
    STATUS = "STATUS",
    EMAIL = "EMAIL",
    PASSWORD = "PASSWORD",
    PHONE = "PHONE",
    GENDER = "GENDER",
    CURRENT_PASSWORD = "CURRENT_PASSWORD",
    NEW_PASSWORD = "NEW_PASSWORD",
    CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
    TYPE = "TYPE",
    URL = "URL",
    TEACHER = "TEACHER",
    CLASSES = "CLASSES"
}
export declare const I18N_FIELD: {
    CODE: string;
    AVATAR: string;
    NAME: string;
    COLOR: string;
    STATUS: string;
    EMAIL: string;
    PASSWORD: string;
    PHONE: string;
    GENDER: string;
    CURRENT_PASSWORD: string;
    NEW_PASSWORD: string;
    CONFIRM_PASSWORD: string;
    TYPE: string;
    URL: string;
    TEACHER: string;
    CLASSES: string;
};
export declare enum ENUM_GENDER {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
