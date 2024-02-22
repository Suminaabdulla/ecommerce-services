import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationSearch = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { page, size, search } = request.query;
    return {
      page: page ? Number(page) : 1,
      size: size ? Number(size) : 10,
      search: search,
    };
  },
);
