import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => BaseService))
    private readonly baseService: BaseService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) this.baseService.ThrowUnauthorized();
    return user;
  }
}
