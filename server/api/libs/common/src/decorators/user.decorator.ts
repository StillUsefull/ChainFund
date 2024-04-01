import { JwtPayload } from "@auth/interfaces/JwtPayload";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";




export const UserDecorator = createParamDecorator((key: keyof JwtPayload, context: ExecutionContext): JwtPayload | Partial<JwtPayload>=> {
    const req = context.switchToHttp().getRequest();
    return key ? req.user[key] : req.user
})