import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { DatabaseService } from '@database/database.service';
import { Prisma, Role } from '@prisma/client';
import { validateUserPermission } from '@common/utils';

@Injectable()
export class HelpRequestService {
    
    constructor(private readonly databaseService: DatabaseService){}
    create(dto: CreateRequestDto, user: JwtPayload){
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // now + 7 days
        return this.databaseService.helpRequest.create({
            data: {
                ...dto,
                userId: user.id,
                expires: expiresAt
            }
        })
    }

    findOne(where: Prisma.HelpRequestWhereUniqueInput) {
        return this.databaseService.helpRequest.findUnique({
            where
        });
    }

    setAnswer(id: string, text: string){
        return this.databaseService.helpRequest.update({
            where: {id},
            data: {
                answer: text
            }
        })
    }

    findMany(where: Prisma.HelpRequestWhereInput){
        return this.databaseService.helpRequest.findMany({
            where
        });
    }

    async delete(id: string, user: JwtPayload){
        const request = await this.findOne({id})

        validateUserPermission(user, id);

        if (!request){
            throw new NotFoundException()
        }

        return this.databaseService.helpRequest.delete({where: {id}})
    }

}
