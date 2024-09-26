import { ConfigService } from '@nestjs/config';
declare const RefreshJwtStrategy_base: new (...args: any[]) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
