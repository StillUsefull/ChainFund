import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { Role, User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt'
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { convertTimeToSeconds } from '@common/utils';
@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache,
                private readonly configService: ConfigService
    ){}

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

    async findOne(scan: string, isReset = false){
        if (isReset){
            await this.cacheManager.del(scan);
        }
        const user = await this.cacheManager.get<User>(scan);
        if (!user){
            const user = this.databaseService.user.findFirst({where: {
                OR: [
                    {id: scan},
                    {email: scan}
                ]
            }});
            if (!user){
                return null;
            }
            await this.cacheManager.set(scan, user, convertTimeToSeconds(this.configService.get('JWT_EXP')));
            return user;
        }
        return user
    }

    update(){}

    async delete(id: string, user: JwtPayload){
        if (id !== user.id && user.role !== Role.SUPER){
            throw new ForbiddenException()
        }
        await this.cacheManager.del(id);
        return this.databaseService.user.delete({where: { id }, select: {id: true}})
    }

    private hashPassword(password: string){
        return hashSync(password, genSaltSync(10));
    }
}
