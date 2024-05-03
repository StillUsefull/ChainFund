import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { Roles, UserDecorator } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Throttle } from '@nestjs/throttler';
import { RoleGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('help-request')
export class HelpRequestController {
    constructor(private readonly helpRequestService: HelpRequestService){}


    @Throttle({default: {ttl: 600000, limit: 1}})
    @Post('/send')
    create(@Body() dto: CreateRequestDto, @UserDecorator() user: JwtPayload){
        return this.helpRequestService.create(dto, user);
    }


    @UseGuards(RoleGuard)
    @Roles(Role.SUPER)
    @Put('/answer/:id')
    setAnswer(@Body('text') text: string, @Param('id') id: string){
        return this.helpRequestService.setAnswer(id, text)
    }

    @Get('/my')
    getMy(@UserDecorator() user: JwtPayload){
        return this.helpRequestService.getMy(user);
    }


    @UseGuards(RoleGuard)
    @Roles(Role.SUPER)
    @Get('/all')
    getAll(){
        return this.helpRequestService.getAll()
    }



    @Get('/one/:id')
    getOne(@Param('id') id: string){
        return this.helpRequestService.getOne(id)
    }
}
