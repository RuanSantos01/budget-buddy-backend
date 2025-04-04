import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { create } from "domain";

export const ActiveUserId = createParamDecorator<undefined>((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.userId) {
    throw new UnauthorizedException();
  }
  
  return request.userId;
});