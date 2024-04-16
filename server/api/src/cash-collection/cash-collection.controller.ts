import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards } from '@nestjs/common';
import { CashCollectionService } from './cash-collection.service';
import { Public, Roles, UserDecorator } from '@common/decorators';
import { Category, Role } from '@prisma/client';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CreateCollectionDto } from './dto/CreateCollection.dto';
import { RoleGuard } from '@auth/guards/role.guard';
import { UpdateCollectionDto } from './dto/UpdateCollection.dto';

@Controller('cash-collection')
export class CashCollectionController {
    constructor(private readonly cashCollectionService: CashCollectionService){}

    @Public()
    @Get()
    getPublic(){
        return this.cashCollectionService.getPublic()
    }

    @Public()
    @Get('/category/:category')
    getByCategory(@Param('category') category: Category){
        return this.cashCollectionService.getByCategory(category)
    }

    @Public()
    @Get('/:id')
    getById(@Param('id') id: string){
        return this.cashCollectionService.findOne(id);
    }

    @Get('/my')
    getMyCollections(@UserDecorator() user: JwtPayload){
        return this.cashCollectionService.getByUser(user);
    }


    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @Post('/create')
    create(@Body() dto: CreateCollectionDto, @UserDecorator() user: JwtPayload, @UploadedFile() file?: Express.Multer.File){
        return this.cashCollectionService.create(dto, user, file);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @Put('/update/:id')
    update(@Body() dto: UpdateCollectionDto, @Param('is') id: string, @UserDecorator() user: JwtPayload, @UploadedFile() file?: Express.Multer.File){
        return this.cashCollectionService.update(id, dto, user, file);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @Delete('/delete/:id')
    delete(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.cashCollectionService.delete(id, user);
    }
}
