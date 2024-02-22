import { UserDetailsDto } from '@app/common/dto/user-details.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { TokenPayload } from '@app/common/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDetailsDto, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user?.id.toString(),
    };

    console.log('Generating token payload:', tokenPayload);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authorization', token, {
      httpOnly: true,
      expires,
    });
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }
}
