import { DatabaseService } from '@database/database.service';
import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Role } from '@prisma/client';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class PostService {
    constructor(private readonly databaseService: DatabaseService, private readonly photoService: PhotoService){}

    async getAll(){
        return this.databaseService.post.findMany({where: {publish: true}})
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
        const post = await this.findOne(id)
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
            if (post.photo){
                await this.photoService.deletePhotoByUrl(post.photo);
            }
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
        if (!post){
            throw new ConflictException('There is no post that you try to delete')
        }
        if (user.id !== post.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }
        await this.photoService.deletePhotoByUrl(post.photo);
        return this.databaseService.post.delete({where: {id}})
    }

    async publish(id: string, user: JwtPayload){
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found.');
        }
    
        if (post.publish) {
            throw new ConflictException('This post is already published.');
        }
    
        if (!post.title || !post.text || !post.photo || !post.socialLink) {
            throw new ConflictException('To publish your post, you must fill in all fields.');
        }
    
        return this.update(id, {publish: true}, user)
    }

    async getMyPosts(user: JwtPayload){
        return this.databaseService.post.findMany({where: {authorId: user.id}})
    }

    getByCreator(id: string){
        return this.databaseService.post.findMany({
            where: {
                authorId: id,
                publish: true
            }
        })
    }
}
