import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import {Request, Response} from 'express'
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Tokens } from './interfaces/Tokens';
import { ConfigService } from '@nestjs/config';
import { Cookie } from '@common/decorators/cookies.decorator';
import { UserAgent } from '@common/decorators/userAgent.decorator';
import { Public } from '@common/decorators/public.decorator';
import { GetUserDto } from '@user/dto/GetUser.dto';
import { GoogleGuard } from './guards/google.guard';

@Public()
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly configService: ConfigService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: RegisterUserDto){
        const user = await this.authService.registration(dto)
        if (!user){
            throw new BadRequestException(`Неможливо створити користувача`);
        }

        return new GetUserDto(user);
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto, @Res() response: Response, @UserAgent() userAgent){
        const tokens = await this.authService.login(dto, userAgent);
        if (!tokens){
            throw new BadRequestException('Неможливо увійти за цим користувачем');
        }
        this.setRefreshToken(tokens, response);
      //  return {accessToken: tokens.accessToken};
    }

    @Get('refresh')
    async refreshTokens(@Cookie('refreshToken') refreshToken: string, @Res() res: Response, @UserAgent() userAgent: string){
        if (!refreshToken){
            throw new UnauthorizedException()
        }
        const tokens = await this.authService.refreshTokens(refreshToken, userAgent);
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


    @Get('logout')
    async logout(@Cookie('refreshToken') token, @Res() res: Response){
        await this.authService.deleteRefreshToken(token).catch(() => {
            throw new UnauthorizedException()
        })
        res.cookie('refreshToken', '', {httpOnly: true, secure: true, expires: new Date()})
        res.sendStatus(HttpStatus.OK)
    }

    @UseGuards(GoogleGuard)
    @Get('google')
    googleAuth(){
    }

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleAuthCallback(@Req() req: Request){
        return req.user;
    }
}