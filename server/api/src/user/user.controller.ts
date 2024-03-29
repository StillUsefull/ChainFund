import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService){}


    @Get('all')
    async getAll(){
        return this.userService.getAll()
    }

    @Get(":scan")
    async findOneUser(@Param('scan') scan: string){
        return this.userService.findOne(scan)
    }

    @Delete(":id")
    async deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.userService.delete(id)
    }
}
