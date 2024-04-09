import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/GetUser.dto';
import {Public, Roles, UserDecorator} from '@common/decorators/index'
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@common/options/multer.option';



@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService){}

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('all')
    async getAll(){
        const users = await this.userService.getAll()
        return users.map((user) => new GetUserDto(user))
    }

    @Public()
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
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @UserDecorator() user: JwtPayload, @Body() dto: UpdateUserDto, @UploadedFile() file?: Express.Multer.File){
        return this.userService.update(id, user, dto, file) 
      
    }

    @UseInterceptors(GetUserDto)
    @Get('/iam')
    async iam(@UserDecorator() user: JwtPayload){
        return this.userService.findOne(user.id);
        
    }
}


