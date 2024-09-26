"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_i18n_1 = require("nestjs-i18n");
const path = require("path");
let LanguageModule = class LanguageModule {
};
exports.LanguageModule = LanguageModule;
exports.LanguageModule = LanguageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_i18n_1.I18nModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                resolvers: [
                    { use: nestjs_i18n_1.QueryResolver, options: ['lang', 'locale', 'l'] },
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
                    nestjs_i18n_1.AcceptLanguageResolver,
                    new nestjs_i18n_1.CookieResolver(['lang', 'locale', 'l']),
                ],
                useFactory: (configService) => {
                    const i18n = configService.get('i18n');
                    return {
                        fallbackLanguage: i18n.fallbackLanguage,
                        fallbacks: i18n.fallbacks,
                        loaderOptions: {
                            path: path.join(process.cwd(), 'src/i18n/'),
                            watch: true,
                        },
                        typesOutputPath: path.join(process.cwd(), 'src/generated/i18n.generated.ts'),
                    };
                },
            }),
        ],
    })
], LanguageModule);
//# sourceMappingURL=language.module.js.map