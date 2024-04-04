import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/GetUser.dto';
import {Roles, UserDecorator} from '@common/decorators/index'
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUser.dto';



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
        return this.userService.delete(id, user)
    }

    @UseInterceptors(GetUserDto)
    @Put("/update/:id")
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @UserDecorator() user: JwtPayload, @Body() dto: UpdateUserDto, ){
        return this.userService.update(id, user, dto) 
    }
}


