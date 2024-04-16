import { DatabaseService } from '@database/database.service';
import { ConflictException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/CreateCollection.dto';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { PhotoService } from 'src/photo/photo.service';
import { UpdateCollectionDto } from './dto/UpdateCollection.dto';
import { Category, Comment, Role } from '@prisma/client';

@Injectable()
export class CashCollectionService {
    constructor(private readonly databaseService: DatabaseService, private readonly photoService: PhotoService){}

    getAll(){
        return this.databaseService.cashCollection.findMany();
    }

    getPublic(){
        return this.databaseService.cashCollection.findMany({where: {
            publish: true,
            achieved: false
        }})
    }

    getByUser(user: JwtPayload){
        return this.databaseService.cashCollection.findMany({where: {authorId: user.id}})
    }

    getByCategory(category: Category){
        return this.databaseService.cashCollection.findMany({where: {category}})
    }

    findOne(id: string){
        return this.databaseService.cashCollection.findFirst({where: {id}})
    }

    async create(dto: CreateCollectionDto, user: JwtPayload, photo?: Express.Multer.File) {
        const createData: any = {
            ...dto,
            authorId: user.id
        }
        if (photo){
            const photoUrl = await this.photoService.uploadFile(photo);
            createData.photo = photoUrl;
        }

        return this.databaseService.cashCollection.create({
            data: createData
        })
    }

    async update(id: string, dto: UpdateCollectionDto, user: JwtPayload, photo: Express.Multer.File){
        const collection = await this.databaseService.cashCollection.findUnique({where: {id}});
        if (!collection){
            throw new NotFoundException()
        }
        if (user.id !== collection.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }
        const updateData: any = {
            ...dto
        }
        if (photo){
            await this.photoService.deletePhotoByUrl(collection.photo);
            const photoUrl = await this.photoService.uploadFile(photo);
            updateData.photo = photoUrl
        }
        return this.databaseService.cashCollection.update({
            where: {id},
            data: updateData
        })
    }

    async delete(id: string, user: JwtPayload){
        const collection = await this.databaseService.cashCollection.findUnique({where: {id}})
        if (user.id !== collection.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }
        await this.photoService.deletePhotoByUrl(collection.photo);
        return this.databaseService.cashCollection.delete({where: {id}})
    }


    async publish(id: string, user: JwtPayload){
        const collection = await this.databaseService.cashCollection.findUnique({where: {id}})
        if (!collection){
            throw new NotFoundException();
        }
        if (user.id !== collection.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }

        if (collection.title && collection.text && collection.photo && collection.googlePay && collection.goal){
            return this.databaseService.cashCollection.update({where: {id}, data: {publish: true}});
        }
        throw new ConflictException('To publish your fund, you must fill in all fields')
    }

}
