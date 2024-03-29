import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { User } from '@prisma/client';
import bcrypt, { genSalt, genSaltSync, hashSync } from 'bcrypt'
@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService){}

    create(user: Partial<User>){
        const hashedPassword = this.hashPassword(user.password)
        return this.databaseService.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                name: user.name
            }
        })
    }

    async getAll(){
        return this.databaseService.user.findMany();
    }

    findOne(scan: string){
        return this.databaseService.user.findFirst({where: {
            OR: [
                {id: scan},
                {email: scan}
            ]
        }})
    }

    update(){}

    delete(id: string){
        return this.databaseService.user.delete({where: { id }})
    }

    private hashPassword(password: string){
        return hashSync(password, genSaltSync(10));
    }
}
