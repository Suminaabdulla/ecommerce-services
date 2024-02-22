import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDetailsDto } from '../dto/user-details.dto';

const getCurrentUserByContext = (context: ExecutionContext): UserDetailsDto => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
