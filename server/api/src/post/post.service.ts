import { DatabaseService } from '@database/database.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Role } from '@prisma/client';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class PostService {
    constructor(private readonly databaseService: DatabaseService, private readonly photoService: PhotoService){}

    async getAll(){
        return this.databaseService.post.findMany()
    }

    async findOne(id: string){
        return this.databaseService.post.findFirst({where: {id}})
    }

    async create(dto: CreatePostDto, user: JwtPayload, photo?: Express.Multer.File){
        let createData: any = {
            ...dto,
            authorId: user.id,
        };
        if (photo){
            const photoUrl = await this.photoService.uploadFile(photo);
            createData.photo = photoUrl;
        }
        return this.databaseService.post.create({
            data: createData
        })
    }

    async update(id: string, dto: UpdatePostDto, user: JwtPayload, photo?: Express.Multer.File){
        const post = await this.databaseService.post.findUnique({where: {id}})
        if (!post){
            throw new NotFoundException()
        }
        if (user.id !== post.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }
        let updateData: any = {
            ...dto
        };
        if (photo){
            await this.photoService.deletePhotoByUrl(post.photo);
            const photoUrl = await this.photoService.uploadFile(photo);
            updateData.photo = photoUrl
        }
        return this.databaseService.post.update({
            where: {id}, 
            data: updateData
        })
    }

    async delete(id: string, user: JwtPayload){
        const post = await this.databaseService.post.findUnique({where: {id}})
        if (user.id !== post.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }
        await this.photoService.deletePhotoByUrl(post.photo);
        return this.databaseService.post.delete({where: {id}})
    }
}
