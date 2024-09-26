import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from 'src/config/configuration';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const jwt = configService.get<AppConfig['jwt']>('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.accessToken.secret,
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.authService.getUser(payload.id);
    return user;
  }
}
