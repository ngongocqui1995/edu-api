import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "errors": {
        "CODE_ALREADY_EXISTS": string;
        "VIEW_ALREADY_EXISTS": string;
        "LIKE_ALREADY_EXISTS": string;
        "URL_ALREADY_EXISTS": string;
        "LINK_ALREADY_EXISTS": string;
        "NAME_ALREADY_EXISTS": string;
        "AVATAR_NOT_VALID": string;
        "EMAIL_ALREADY_EXISTS": string;
        "EMAIL_NOT_EXISTS": string;
        "PASSWORD_NOT_VALID": string;
        "MESSAGE_NOT_EMPTY": string;
        "MESSAGE_LENGTH_1_100": string;
        "RECEIVER_NOT_EMPTY": string;
        "CREATED_BY_NOT_EMPTY": string;
        "CREATED_BY_NOT_EXISTS": string;
        "CODE_NOT_EMPTY": string;
        "CODE_LENGTH_3_50": string;
        "CODE_LENGTH_5_50": string;
        "CODE_LENGTH_3_100": string;
        "CODE_LENGTH_5_100": string;
        "EMAIL_NOT_EMPTY": string;
        "EMAIL_NOT_VALID": string;
        "EMAIL_LENGTH_5_100": string;
        "PASSWORD_NOT_EMPTY": string;
        "CURRENT_PASSWORD_NOT_EMPTY": string;
        "NEW_PASSWORD_NOT_EMPTY": string;
        "CONFIRM_PASSWORD_NOT_EMPTY": string;
        "COMPARE_PASSWORD_FAIL": string;
        "MATCHES_PASSWORD": string;
        "PASSWORD_LENGTH_5_100": string;
        "DETAIL_NOT_EMPTY": string;
        "DESCRIPTION_NOT_EMPTY": string;
        "HOST_NOT_EMPTY": string;
        "HOST_ALREADY_EXISTS": string;
        "SUB_NAME_NOT_EMPTY": string;
        "PATH_NOT_EMPTY": string;
        "LINK_NOT_EMPTY": string;
        "NAME_NOT_EMPTY": string;
        "NAME_LENGTH_3_50": string;
        "NAME_LENGTH_5_50": string;
        "NAME_LENGTH_3_100": string;
        "NAME_LENGTH_5_100": string;
        "AVATAR_NOT_EMPTY": string;
        "PICTURE_NOT_EMPTY": string;
        "BACKGROUND_NOT_EMPTY": string;
        "USER_NOT_EMPTY": string;
        "FILE_NAME_NOT_EMPTY": string;
        "PHONE_NOT_EMPTY": string;
        "PHONE_LENGTH_10_10": string;
        "GENDER_NOT_EMPTY": string;
        "GENDER_NOT_VALID": string;
        "PRICE_NUMBER": string;
        "PRICE_MIN": string;
        "FAILED_NUMBER": string;
        "FAILED_MIN": string;
        "VOTES_NUMBER": string;
        "VOTES_MIN": string;
        "INDEX_MIN": string;
        "INDEX_NUMBER": string;
        "TYPE_UPLOAD_NOT_EMPTY": string;
        "TYPE_UPLOAD_NOT_VALID": string;
        "ENVIRONMENT_NOT_EMPTY": string;
        "ENVIRONMENT_NOT_VALID": string;
        "STATUS_NOT_EMPTY": string;
        "STATUS_NOT_VALID": string;
        "STATUS_NOT_ACTIVE": string;
        "CHANGE_STATUS_USER_CURRENT": string;
        "COLOR_NOT_EMPTY": string;
        "COLOR_LENGTH_0_50": string;
        "URL_NOT_EMPTY": string;
        "URL_LENGTH_0_100": string;
        "FILE_NOT_EXISTS": string;
        "ACTION": {
            "GET": string;
            "CREATE": string;
            "UPDATE": string;
            "DELETE": string;
            "ACTIVE": string;
            "INACTIVE": string;
            "CHANGE_STATUS": string;
        };
        "GET_ERROR": string;
        "UPDATE_ERROR": string;
        "NOT_EXIST": string;
        "NOT_EXIST_ID": string;
        "RESET_PASSWORD": {
            "WRONG_CURRENT_PASSWORD": string;
            "CHANGE_PASSWORD_ERROR": string;
        };
        "UNAUTHORIZED": string;
        "PHONE_ALREADY_EXISTS": string;
        "USER_ALREADY_REGISTERED": string;
        "E0001": string;
        "E0002": string;
        "E0003": string;
        "E0004": string;
        "E0005": string;
        "E0006": string;
        "E0007": string;
        "E0008": string;
        "E0009": string;
        "E0010": string;
        "E0011": string;
        "E0012": string;
        "E0013": string;
        "E0014": string;
        "E0015": string;
        "E0016": string;
        "E0017": string;
        "E0018": string;
        "E0019": string;
        "E0020": string;
        "E0021": string;
        "E0022": string;
        "E0023": string;
        "PHONE_LENGTH_5_50": string;
    };
    "fields": {
        "CODE": string;
        "AVATAR": string;
        "NAME": string;
        "COLOR": string;
        "STATUS": string;
        "EMAIL": string;
        "PASSWORD": string;
        "PHONE": string;
        "GENDER": string;
        "CURRENT_PASSWORD": string;
        "CONFIRM_PASSWORD": string;
        "NEW_PASSWORD": string;
        "TYPE": string;
        "URL": string;
        "TEACHER": string;
        "CLASSES": string;
    };
    "messages": {
        "ACTION": {
            "CREATE": string;
            "UPDATE": string;
            "DELETE": string;
            "ACTIVE": string;
            "INACTIVE": string;
            "CHANGE_STATUS": string;
            "GET": string;
        };
        "AUTH": {
            "UNAUTHORIZED": string;
            "AUTHORIZED": string;
        };
        "STATUS": {
            "ACTIVE": string;
            "INACTIVE": string;
        };
        "GET_SUCCESS": string;
        "UPDATE_SUCCESS": string;
    };
    "models": {
        "USER": string;
        "TEACHER": string;
        "CLASS": string;
        "STUDENT": string;
        "ATTENDANCE": string;
    };
    "validation": {
        "isString": string;
        "isNotEmpty": string;
        "length": string;
        "isEnum": string;
        "unique": string;
        "isEmail": string;
        "isPassword": string;
        "isNumber": string;
        "min": string;
        "isExist": string;
        "isNumberString": string;
        "wrongPasswprd": string;
        "confirmPasswordNotMatch": string;
    };
};
export type I18nPath = Path<I18nTranslations>;
