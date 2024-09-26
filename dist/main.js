"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const BasicAuth = require("express-basic-auth");
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("./common/enum");
const fs = require("fs");
const path = require("path");
const nestjs_i18n_1 = require("nestjs-i18n");
const class_validator_1 = require("class-validator");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const environment = configService.get('environment');
    const server = configService.get('server');
    const swagger = configService.get('swagger');
    app.use(swagger.uri, BasicAuth(swagger.auth));
    const options = new swagger_1.DocumentBuilder()
        .setTitle(swagger.title)
        .setDescription(swagger.description)
        .setVersion(swagger.version)
        .addBearerAuth(swagger.bearerAuth.options, enum_1.BearerAuthName)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    const pathJson = path.join(process.cwd(), swagger.pathJson);
    fs.writeFileSync(pathJson, JSON.stringify(document));
    swagger_1.SwaggerModule.setup(swagger.path, app, document, {
        customSiteTitle: swagger.title,
        swaggerOptions: swagger.swaggerOptions,
    });
    app.enableCors();
    app.useGlobalPipes(new nestjs_i18n_1.I18nValidationPipe());
    app.useGlobalFilters(new nestjs_i18n_1.I18nValidationExceptionFilter({ detailedErrors: false }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(process.env.PORT || server.port);
    console.log(`Application is Environment: ${environment}`);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map