import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
// import * as BasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BearerAuthName } from 'src/common/enum';
import * as fs from 'fs';
import * as path from 'path';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const environment = configService.get<string>('environment');
  const server = configService.get<AppConfig['server']>('server');
  const swagger = configService.get<AppConfig['swagger']>('swagger');

  // app.use(swagger.uri, BasicAuth(swagger.auth));

  const options = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addBearerAuth(swagger.bearerAuth.options, BearerAuthName)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const pathJson = path.join(process.cwd(), swagger.pathJson);
  fs.writeFileSync(pathJson, JSON.stringify(document));

  SwaggerModule.setup(swagger.path, app, document, {
    customSiteTitle: swagger.title,
    swaggerOptions: swagger.swaggerOptions,
  });

  app.enableCors();
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || server.port);

  console.log(`Application is Environment: ${environment}`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
