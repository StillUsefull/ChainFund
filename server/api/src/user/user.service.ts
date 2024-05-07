import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { Prisma, Role, User } from '@prisma/client';
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { convertTimeToSeconds } from '@common/utils';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { PhotoService } from 'src/photo/photo.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { updatePasswordDto } from './dto/UpdatePassword.dto';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService,
                private readonly photoService: PhotoService,
                private readonly mailService: MailService
    ){}

    async create(dto: CreateUserDto, role?: Role){
        const user = await this.findByEmail(dto.email);
        if (user){
            throw new ConflictException(`User with email ${dto.email} have already registered`)
        }
        dto.password = this.hashPassword(dto.password)
        if (role) {
            return this.databaseService.user.create({
                data: {
                    ...dto,
                    role
                }
            })
        }
        return this.databaseService.user.create({
            data: {
                ...dto,
            }
        })
    }

    async getAll(){
        return this.databaseService.user.findMany();
    }

    getCreators(){
        return this.databaseService.user.findMany({where: {role: Role.ADMIN}});
    }

    async findOne(id: string) {
        return this.databaseService.user.findUnique({
            where: {
                id
            }
        });
    }

    async findByEmail(email: string) {
        return this.databaseService.user.findUnique({
            where: {
                email
            }
        });
    }

    async update(id: string,  user: JwtPayload, dto: Partial<UpdateUserDto>, file: Express.Multer.File){
        if (id !== user.id && user.role !== Role.SUPER){
            throw new ForbiddenException()
        }
        let updateData: any = {
            ...dto
        }
        const userData = await this.findOne(id)
        if(file){
            if (userData.photo){
                await this.photoService.deletePhotoByUrl(userData.photo)
            }
            const photoUrl = await this.photoService.uploadFile(file);
            updateData.photo = photoUrl;
        }
        
        return this.databaseService.user.update({
            where: {
                id: id
            }, 
            data: updateData
        })
    }

    async delete(id: string, user: JwtPayload){
        if (id !== user.id && user.role !== Role.SUPER){
            throw new ForbiddenException()
        }
        return this.databaseService.user.delete({where: { id }, select: {id: true}})
    }

    private hashPassword(password: string){
        return hashSync(password, genSaltSync(10));
    }

    async updatePassword(user: JwtPayload, dto: updatePasswordDto){
        const data = await this.findOne(user.id);
        if (!data){
            throw new NotFoundException()
        }
        if (!user || !compareSync(dto.currentPassword, data.password)) throw new ConflictException('Current password doesn`t match');

        return this.databaseService.user.update({
            where: {
                id: data.id
            }, 
            data: {
                password: this.hashPassword(dto.newPassword)
            }
        })
    }

    findRandomUsers(count = 3){
        return this.databaseService.$queryRaw<User[]>`SELECT * FROM "User" WHERE role = 'ADMIN' ORDER BY RANDOM() LIMIT ${count}`;
    }

    async passwordRecovery(email: string){
        const user = await this.databaseService.user.findUnique({where: {email}});
        if (!user){
            throw new ConflictException('Can not find user with this email');
        }
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = this.hashPassword(password);
        await Promise.all([
            this.mailService.sendRecoveryPassword(email, password),
            this.databaseService.user.update({
                where: {
                    email
                }, 
                data: {
                    password: hashedPassword
                }
            })
        ]) 
        
    }
}
