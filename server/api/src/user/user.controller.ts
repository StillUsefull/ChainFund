import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/GetUser.dto';
import {Roles, UserDecorator} from '@common/decorators/index'
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Role } from '@prisma/client';



@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('all')
    async getAll(){
        const users = await this.userService.getAll()
        return users.map((user) => new GetUserDto(user))
    }

    @UseInterceptors(GetUserDto)
    @Get("/getOne/:scan")
    async findOneUser(@Param('scan') scan: string){
        const user = await this.userService.findOne(scan);
        return new GetUserDto(user)
    }

    @UseInterceptors(GetUserDto)
    @Delete("/delete/:id")
    async deleteUser(@Param('id', ParseUUIDPipe) id: string, @UserDecorator() user: JwtPayload){
        return await this.userService.delete(id, user)
    }
}


