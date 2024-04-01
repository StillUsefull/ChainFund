import { ExecutionContext, createParamDecorator } from "@nestjs/common";



export const UserAgent = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['user-agent']
})