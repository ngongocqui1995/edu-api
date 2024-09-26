import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
      useFactory: (configService: ConfigService) => {
        const i18n = configService.get<AppConfig['i18n']>('i18n');

        return {
          fallbackLanguage: i18n.fallbackLanguage,
          fallbacks: i18n.fallbacks,
          loaderOptions: {
            path: path.join(process.cwd(), 'src/i18n/'),
            watch: true,
          },
          typesOutputPath: path.join(
            process.cwd(),
            'src/generated/i18n.generated.ts',
          ),
        };
      },
    }),
  ],
})
export class LanguageModule {}
