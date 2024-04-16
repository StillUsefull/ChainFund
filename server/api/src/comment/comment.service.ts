import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { DatabaseService } from '@database/database.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class CommentService {

    constructor(private readonly databaseService: DatabaseService){}

    create(text: string, user: JwtPayload, collectionId: string){
        return this.databaseService.comment.create({
            data: {
                text,
                authorId: user.id,
                collectionId
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
        
    }
}
