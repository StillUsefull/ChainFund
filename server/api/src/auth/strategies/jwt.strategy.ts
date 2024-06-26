import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/JwtPayload";
import { UserService } from "@user/user.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET') || 'secret'
        })
    }

    async validate(payload: JwtPayload){
        const user = await this.userService.findOne({id: payload.id}).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user){
            throw new UnauthorizedException()
        }
        return payload
    }
}