import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '@app/common/interfaces/token-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const token =
            request?.cookies?.Authorization ||
            request?.headers?.authorization ||
            request?.headers?.Authorization ||
            request?.data?.Authorization ||
            request?.meta?.Authorization;
          return token;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    console.log('JwtStrategy.validate.userId:', userId);
    return this.usersService.getUser({ id: +userId });
  }
}
