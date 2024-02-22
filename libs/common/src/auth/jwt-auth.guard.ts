import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthClientHttpService } from './auth-client-http.service';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { UserDetailsDto } from '../dto/user-details.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authClient: AuthClientHttpService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('Executing auth guard');
    this.logger.log(context.switchToHttp().getRequest().headers);

    const jwt =
      context.switchToHttp().getRequest().cookies?.Authorization ||
      context.switchToHttp().getRequest().headers?.authorization;

    console.log('Jwt:', jwt);
    this.logger.debug(jwt);

    if (!jwt) {
      this.logger.error('Jwt token is empty');
      return false;
    }

    return this.authClient
      .authenticate(context.switchToHttp().getRequest())
      .pipe(
        switchMap((userDetails: UserDetailsDto) => {
          const request = context.switchToHttp().getRequest();
          request.user = userDetails;
          return of(true);
        }),
        catchError((err) => {
          this.logger.error('Error in auth guard:', err);
          return of(false);
        }),
      );
  }
  private readonly logger = new Logger(JwtAuthGuard.name);
}
