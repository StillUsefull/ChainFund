import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { validateUserPermission } from '@common/utils';
import { DatabaseService } from '@database/database.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';

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

    findOne(where: Prisma.CommentWhereUniqueInput){
        return this.databaseService.comment.findUnique({
            where
        })
    }

    findMany(where: Prisma.CommentWhereInput){
        return this.databaseService.comment.findMany({
            where
        })
    }

    async delete(id: string, user: JwtPayload){
        const comment = await this.findOne({id})
        if (!comment){
            throw new NotFoundException()
        } 
        validateUserPermission(user, comment.authorId)
        return this.databaseService.comment.delete({where: {id}});
    }

    async modify(id: string, text: string, user: JwtPayload){
        const comment = await this.databaseService.comment.findUnique({where: {id}})
        
        if (!comment){
            throw new NotFoundException()
        }
        validateUserPermission(user, comment.authorId)

        return this.databaseService.comment.update({
            where: {id},
            data: {
                text
            }
        })
    }
}
