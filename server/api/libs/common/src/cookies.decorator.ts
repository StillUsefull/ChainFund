import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const Cookie = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.cookie[key] : req.cookie;
})