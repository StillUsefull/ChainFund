import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import {Response} from 'express'
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Tokens } from './interfaces/Tokens';
import { ConfigService } from '@nestjs/config';
import { Cookie } from '@common/cookies.decorator';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly configService: ConfigService){}

    @Post('register')
    async register(@Body() dto: RegisterUserDto){
        const user = await this.authService.registration(dto)
        if (!user){
            throw new BadRequestException(`Неможливо створити користувача`);
        }
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto, @Res() response: Response){
        const tokens = await this.authService.login(dto);
        if (!tokens){
            throw new BadRequestException('Неможливо увійти за цим користувачем');
        }
        this.setRefreshToken(tokens, response);
      //  return {accessToken: tokens.accessToken};
    }

    @Get('refresh')
    async refreshTokens(@Cookie('refreshToken') refreshToken: string, @Res() res: Response){
        if (!refreshToken){
            throw new UnauthorizedException()
        }
        const tokens = await this.authService.refreshTokens(refreshToken);
        if (!tokens){
            throw new UnauthorizedException()
        }
        this.setRefreshToken(tokens, res)
    }


    private setRefreshToken(tokens: Tokens, res: Response){
        if (!tokens){
            throw new UnauthorizedException();
        }
        res.cookie('refreshToken', tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: this.configService.get('NODE_ENV', 'development') === 'production',
            path: '/'
        });
        res.status(HttpStatus.CREATED).json({accessToken: tokens.accessToken});
    }
}
