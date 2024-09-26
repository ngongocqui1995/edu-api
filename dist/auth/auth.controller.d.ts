import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        user: import("../modules/users/entities/user.entity").User;
        accessToken: string;
        refreshToken: string;
        message: unknown;
    }>;
    refreshToken(req: any): Promise<{
        accessToken: string;
    }>;
    profile(req: any): Promise<any>;
}
