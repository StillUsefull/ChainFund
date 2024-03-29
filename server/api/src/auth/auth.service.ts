import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { UserService } from '@user/user.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Tokens } from './interfaces/Tokens';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@prisma/client';
import { DatabaseService } from '@database/database.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, 
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService
    ){}

    private readonly logger = new Logger(AuthService.name);

    async registration(dto: RegisterUserDto){
        const user = await this.userService.findOne(dto.email);
        if (user){
            throw new ConflictException(`Користувач з поштою ${dto.email} вже зареєстрований`)
        }
        return this.userService.create(dto).catch(err => {
            this.logger.error(err)
            return null;
        })
    }

    async login(dto: LoginUserDto, /* userAgent: string */): Promise<Tokens>{
        const user = await this.userService.findOne(dto.email).catch(err => {
            this.logger.error(err);
            return null;
        });

        if (!user || !compareSync(dto.password, user.password)) throw new UnauthorizedException('Не правильний логін або пароль');

        return this.generateTokens(user);

    }

    private async getRefreshToken(userId: string, /* userAgent: string */): Promise<Token>{
        return this.databaseService.token.create({
           data: {
                token: v4(),
                exp: add(new Date(), {months: 1}),
                userId: userId,
               // userAgent: userAgent
           }
            
        })
    }

    private async generateTokens(user: User): Promise<Tokens>{
        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role
        })

        const refreshToken = await this.getRefreshToken(user.id, /* userAgent */);
        
        return {accessToken, refreshToken}
    }

    async refreshTokens(refreshToken: string): Promise<Tokens> {
        const token = await this.databaseService.token.delete({where: {token: refreshToken}});
        if (!token){
            throw new UnauthorizedException();
        }
        const user = await this.databaseService.user.findFirst({where: {id: token.userId}})
        return this.generateTokens(user);
    }
}
