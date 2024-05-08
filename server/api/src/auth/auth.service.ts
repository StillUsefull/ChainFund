import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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

    async registration(dto){
        return this.userService.create(dto).catch(err => {
            this.logger.error(err)
            return null;
        })
    }

    async login(dto: LoginUserDto, userAgent: string): Promise<Tokens>{
        const user = await this.userService.findOne({email: dto.email}).catch(err => {
            this.logger.error(err);
            return null;
        });
        if (!user || !compareSync(dto.password, user.password)) throw new UnauthorizedException('Email and password doesn`t match');

        return this.generateTokens(user, userAgent);

    }

    private async getRefreshToken(userId: string, userAgent: string): Promise<Token>{
        const tokenData = await this.databaseService.token.findFirst({
            where: {
                userId,
                userAgent: userAgent,
            },
        });
        //avaliable method upsert 
        if (tokenData) {
            return this.databaseService.token.update({
                where: { token: tokenData.token },
                data: {
                    token: v4(),
                    exp: add(new Date(), { months: 1 })
                }
            });
        } else {
            return this.databaseService.token.create({
                data: {
                    token: v4(),
                    exp: add(new Date(), { months: 1 }),
                    userId: userId,
                    userAgent
                }
            });
        }
    }

    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken =
            'Bearer ' +
            this.jwtService.sign({
                id: user.id,
                email: user.email,
                role: user.role,
            });
        const refreshToken = await this.getRefreshToken(user.id, agent);
        return { accessToken, refreshToken };
    }

    async refreshTokens(refreshToken: string, userAgent: string): Promise<Tokens> {
        const token = await this.databaseService.token.findUnique({where: {token: refreshToken}});
        if (!token){
            throw new UnauthorizedException();
        }
        await this.databaseService.token.delete({where: {token: refreshToken}});
        if(new Date(token.exp) < new Date()){
            throw new UnauthorizedException()
        }
        const user = await this.userService.findOne({id: token.userId})
        return this.generateTokens(user, userAgent);
    }

    async deleteRefreshToken(token){
        return this.databaseService.token.delete({where: {token}})
    }
}
