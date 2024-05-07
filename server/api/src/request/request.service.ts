import { DatabaseService } from '@database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UserService } from '@user/user.service';
import { Role } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class RequestService {
    constructor(private readonly databaseService: DatabaseService, 
                private readonly userServise: UserService,
                private readonly mailService: MailService
            ){}

    create(dto: CreateRequestDto){
        return this.databaseService.request.create({
            data: {
                ...dto
            }
        })
    }


    getAll(){
        return this.databaseService.request.findMany();
    }


    async approve(id: string){
        const request = await this.databaseService.request.findUnique({where: {id}});
        if (!request){
            throw new NotFoundException();
        }

        const password = Math.random().toString(36).slice(-8);

        const dto = {
            email: request.email,
            password: password,
            name: request.name
        }
        await Promise.all([
            this.userServise.create(dto, Role.ADMIN),
            this.mailService.sendApprovedRequest(request.email, password),
            this.databaseService.request.delete({where: {id}})
        ]);
    }


    async decline(id: string){
        const request = await this.databaseService.request.findUnique({where: {id}});
        if (!request){
            throw new NotFoundException();
        }

        await Promise.all([
            this.mailService.sendDeclineRequest(request.email),
            await this.databaseService.request.delete({where: {id}})
        ]) 
        
    }
}
