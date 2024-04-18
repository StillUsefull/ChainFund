import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CashCollectionService } from './cash-collection.service';
import { Public, Roles, UserDecorator } from '@common/decorators';
import { Category, Role } from '@prisma/client';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CreateCollectionDto } from './dto/CreateCollection.dto';
import { RoleGuard } from '@auth/guards/role.guard';
import { UpdateCollectionDto } from './dto/UpdateCollection.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@common/options/multer.option';

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
    getByCategory(@Param('category') category: string){
        return this.cashCollectionService.getByCategory(category)
    }

    @Public()
    @Get('/findOne/:id')
    getById(@Param('id') id: string){
        return this.cashCollectionService.findOne(id);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @Get('/my')
    getMyCollections(@UserDecorator() user: JwtPayload){
        return this.cashCollectionService.getByUser(user);
    }

    @Post('/create')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    create(@Body() dto: CreateCollectionDto, @UserDecorator() user: JwtPayload, @UploadedFile() file?: Express.Multer.File){
        return this.cashCollectionService.create(dto, user, file);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @UseInterceptors(FileInterceptor('file', multerOptions))
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
