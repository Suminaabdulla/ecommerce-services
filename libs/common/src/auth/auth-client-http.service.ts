import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserDetailsDto } from '../dto/user-details.dto';
import { map } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthClientHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthAPIUrl(path: string): string {
    const baseUrl = this.configService.get('AUTH_BASE_URL');
    return `${baseUrl}/api/v1/users/${path}`;
  }

  authenticate(request: Request) {
    const url = this.getAuthAPIUrl('info');
    return this.httpService
      .get<UserDetailsDto>(url, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(map((response) => response.data));
  }
}
