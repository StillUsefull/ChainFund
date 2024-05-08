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
import { PaginationInterceptor } from '@common/pagination/pagination.interceptor';


@Controller('cash-collection')
export class CashCollectionController {
    constructor(private readonly cashCollectionService: CashCollectionService){}

    
    @Get('/all')
    @UseInterceptors(PaginationInterceptor)
    getAll(){
        return this.cashCollectionService.findMany({});
    }

    
    @Public()
    @Get()
    @UseInterceptors(PaginationInterceptor)
    getPublic(){
        return this.cashCollectionService.findMany({publish: true, achieved: false})
    }

    @Public()
    @UseInterceptors(PaginationInterceptor)
    @Get('/archive')
    getArchive(){
        return this.cashCollectionService.findMany({publish: true, achieved: true});
    }

    @Public()
    @Get('/category/:category')
    @UseInterceptors(PaginationInterceptor)
    getByCategory(@Param('category') category: Category){
        return this.cashCollectionService.findMany({publish: true, category, achieved: false})
    }

    @Public()
    @Get('/findOne/:id')
    getById(@Param('id') id: string){
        return this.cashCollectionService.findOne({id});
    }

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @Get('/my')
    getMyCollections(@UserDecorator() user: JwtPayload){
        return this.cashCollectionService.findMany({authorId: user.id});
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
    update(@Body() dto: UpdateCollectionDto, @Param('id') id: string, @UserDecorator() user: JwtPayload, @UploadedFile() file?: Express.Multer.File){
        return this.cashCollectionService.update(id, dto, user, file);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @Delete('/delete/:id')
    delete(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.cashCollectionService.delete(id, user);
    }


    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @Get('/publish/:id')
    publish(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.cashCollectionService.publish(id, user);
    }

    @Get('/promote/:id')
    promote(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.cashCollectionService.promote(id, user)
    }

    @Public()
    @Get('/byCreator/:id')
    getByCreator(@Param('id') id: string){
        return this.cashCollectionService.getByCreator(id)
    }

}
