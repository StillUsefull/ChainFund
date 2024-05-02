import { Public, Roles } from '@common/decorators';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { RequestService } from './request.service';
import { RoleGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';

@Controller('request')
export class RequestController {
    
    constructor(private readonly requestService: RequestService){}

    @Public()
    @Throttle({default: {limit: 3, ttl: 60000}})
    @Post('/create')
    createRequest(@Body() dto: CreateRequestDto){
        return this.requestService.create(dto);
    }


    @UseGuards(RoleGuard)
    @Roles(Role.SUPER)
    @Put('/aprove/:id')
    approve(@Param('id') id: string){
        return this.requestService.approve(id);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.SUPER)
    @Get()
    getAll(){
        return this.requestService.getAll()
    }

    @UseGuards(RoleGuard)
    @Roles(Role.SUPER)
    @Put('/decline/:id')
    decline(@Param('id') id: string){
        return this.requestService.decline(id);
    }
}
