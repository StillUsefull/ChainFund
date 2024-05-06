import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { DatabaseService } from '@database/database.service';
import { Role } from '@prisma/client';

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

    getOne(id: string) {
        return this.databaseService.helpRequest.findUnique({where: {id}});
    }

    setAnswer(id: string, text: string){
        return this.databaseService.helpRequest.update({
            where: {id},
            data: {
                answer: text
            }
        })
    }

    getAll(){
        return this.databaseService.helpRequest.findMany();
    }

    async delete(id: string, user: JwtPayload){
        const request = await this.databaseService.helpRequest.findUnique({where: {id}});

        if (request.userId != user.id && user.role != Role.SUPER){
            throw new ForbiddenException()
        }

        if (!request){
            throw new NotFoundException()
        }

        return this.databaseService.helpRequest.delete({where: {id}})
    }

    getMy(user: JwtPayload){
        return this.databaseService.helpRequest.findMany({where: {userId: user.id}})
    }
}
