import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { Public, Roles, UserDecorator } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@common/options/multer.option';
import { RoleGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';


@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Public()
    @Get()
    getAll(){
        return this.postService.getAll()
    }

    @Get('/findOne/:id')
    findOne(@Param('id') id: string){
        return this.postService.findOne(id);
    }

    @Post('/create')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    create(@Body() dto: CreatePostDto, @UserDecorator() user: JwtPayload, @UploadedFile() file?: Express.Multer.File){
        return this.postService.create(dto, user, file);
    }

    @Put('/update/:id')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    update( @Param('id') id: string, 
            @Body() dto: UpdatePostDto,
            @UserDecorator() user: JwtPayload, 
            @UploadedFile() file?: Express.Multer.File
        ){
            return this.postService.update(id, dto, user, file)
    }

    @Delete('/delete/:id')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    delete(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.postService.delete(id, user)
    }


    @Get('/publish/:id')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER)
    publish(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.postService.publish(id, user);
    }

    @Get('/my')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    getMy(@UserDecorator() user: JwtPayload){
        return this.postService.getMyPosts(user)
    }
}
