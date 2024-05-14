import { DatabaseService } from '@database/database.service';
import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Post, Prisma, Role } from '@prisma/client';
import { PhotoService } from '@photo/photo.service';
import { validateUserPermission } from '@common/utils';

@Injectable()
export class PostService {
    constructor(private readonly databaseService: DatabaseService, private readonly photoService: PhotoService){}

    

    findOne(where: Prisma.PostWhereUniqueInput): Promise<Post | null>{
        return this.databaseService.post.findUnique({
            where
        })
    }

    findMany(where: Prisma.PostWhereInput = {}): Promise<Post[] | null>{
        return this.databaseService.post.findMany({
            where
        })
    }

    async create(dto: CreatePostDto, user: JwtPayload, photo?: Express.Multer.File){
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 14); // now + 14 days
        let createData: any = {
            ...dto,
            authorId: user.id,
            expires: expiresAt
        };
        if (photo){
            const photoUrl = await this.photoService.uploadFile(photo);
            createData.photo = photoUrl;
        }
        return this.databaseService.post.create({
            data: createData
        })
    }

    async update(id: string, dto, user: JwtPayload, photo?: Express.Multer.File){
        const post = await this.findOne({id})
        if (!post){
            throw new NotFoundException()
        }

        validateUserPermission(user, post.authorId)
        
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
        const post = await this.findOne({id})
        if (!post){
            throw new ConflictException('There is no post that you try to delete')
        }
        validateUserPermission(user, post.authorId)
        if (post.photo){
            await this.photoService.deletePhotoByUrl(post.photo);
        }
        return this.databaseService.post.delete({where: {id}})
    }

    async publish(id: string, user: JwtPayload){
        const post = await this.findOne({id});
        if (!post) {
            throw new NotFoundException('Post not found.');
        }
    
        if (post.publish) {
            throw new ConflictException('This post is already published.');
        }
    
        if (!post.title || !post.text || !post.photo || !post.socialLink) {
            throw new ConflictException('To publish your post, you must fill in all fields.');
        }
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 14); // now + 14 days
        return this.update(id, {publish: true, expires: expiresAt}, user)
    }

}
