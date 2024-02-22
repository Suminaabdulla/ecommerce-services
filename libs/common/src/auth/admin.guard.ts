import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../enum/roles.enum';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('Executing auth guard');
    this.logger.log(context.switchToHttp().getRequest().user);

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return (
      user && user.role && user.role.name.toLocaleUpperCase() === ROLES.ADMIN
    );
  }
  private readonly logger = new Logger(AdminGuard.name);
}
