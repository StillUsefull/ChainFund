import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { Prisma, Role, User } from '@prisma/client';
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { PhotoService } from 'src/photo/photo.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { updatePasswordDto } from './dto/UpdatePassword.dto';
import { MailService } from 'src/mail/mail.service';
import { validateUserPermission } from '@common/utils';
@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService,
                private readonly photoService: PhotoService,
                private readonly mailService: MailService,
    ){}

    async create(dto: CreateUserDto, role?: Role): Promise<User | null>{
        const user = await this.findOne({email: dto.email});
        if (user){
            throw new ConflictException(`User with email ${dto.email} have already registered`)
        }
        dto.password = this.hashPassword(dto.password)
        return this.databaseService.user.create({
            data: {
                ...dto,
                ...(role && {role})
            }
        })
    }


    findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.databaseService.user.findUnique({
            where,
        });
    }

    async findMany(where: Prisma.UserWhereInput = {}): Promise<User[]> {
        return this.databaseService.user.findMany({
            where,
        });
    }

    async update(id: string,  user: JwtPayload, dto: Partial<UpdateUserDto>, file: Express.Multer.File): Promise<User | null>{
        if (id !== user.id && user.role !== Role.SUPER){
            throw new ForbiddenException()
        }
        let updateData: any = {
            ...dto
        }
        const userData = await this.findOne({id})
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

    async delete(id: string, user: JwtPayload): Promise<Object>{
        validateUserPermission(user, id)
        return this.databaseService.user.delete({where: { id }, select: {id: true}})
    }

    private hashPassword(password: string): string{
        return hashSync(password, genSaltSync(10));
    }

    async updatePassword(user: JwtPayload, dto: updatePasswordDto){
        const data = await this.findOne({id: user.id});
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
        const user = await this.findOne({email})
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
