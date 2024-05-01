import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { DatabaseService } from '@database/database.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class CommentService {

    constructor(private readonly databaseService: DatabaseService){}

    create(text: string, user: JwtPayload, postId: string){
        return this.databaseService.comment.create({
            data: {
                text,
                authorId: user.id,
                postId
            }
        })
    }

    async delete(id: string, user: JwtPayload){
        const comment = await this.databaseService.comment.findUnique({where: {id}});
        if (!comment){
            throw new NotFoundException()
        } 
        if (comment.authorId !== user.id && user.role !== Role.SUPER){
            throw new ForbiddenException()
        }
        return this.databaseService.comment.delete({where: {id}});
    }

    async modify(id: string, text: string, user: JwtPayload){
        const comment = await this.databaseService.comment.findUnique({where: {id}})
        
        if (!comment){
            throw new NotFoundException()
        }
        if (user.id !== comment.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }

        return this.databaseService.comment.update({
            where: {id},
            data: {
                text
            }
        })


    }

    async getById(id: string){
        return this.databaseService.comment.findMany({where: {postId: id}});
    }
}
