import { DatabaseService } from '@database/database.service';
import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/CreateCollection.dto';
import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { PhotoService } from 'src/photo/photo.service';
import { UpdateCollectionDto } from './dto/UpdateCollection.dto';
import { Category, Comment, Role } from '@prisma/client';


@Injectable()
export class CashCollectionService {
    categoryTemplate: any;
    constructor(private readonly databaseService: DatabaseService, private readonly photoService: PhotoService){
        this.categoryTemplate = {
            'TECH': Category.TECH,
            'MILITARY': Category.MILITARY,
            'HEALTH': Category.HEALTH,
            'DEVELOPMENT': Category.DEVELOPMENT,
            'ECO': Category.ECO,
            'ART': Category.ART
        }
    }

    getAll(){
        return this.databaseService.cashCollection.findMany();
    }

    getArchive(){
        return this.databaseService.cashCollection.findMany({where: {
            achieved: true,
            publish: true
        }})
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

    getByCategory(category: string){
        
        if (!this.categoryTemplate[category]){
            throw new NotFoundException('There is no that category');
        }
        return this.databaseService.cashCollection.findMany({where: 
            {
                category: this.categoryTemplate[category],
                publish: true
            }})
    }

    async findOne(id: string){
        const collection = await this.databaseService.cashCollection.findFirst({where: {id}});
        if (!collection){
            throw new NotFoundException('There is no fund with that id') 
        }
        return collection;
    }

    async create(dto: CreateCollectionDto, user: JwtPayload, photo?: Express.Multer.File) {
        const createData: any = {
            ...dto,
            authorId: user.id
        }
        if (dto.category){
            if (!this.categoryTemplate[dto.category]){
                throw new NotFoundException('There is no that category');
            }
            createData.category = this.categoryTemplate[dto.category];
        }

        if (dto.goal){
            createData.goal = Number(dto.goal);
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
        const collection = await this.findOne(id);
        if (!collection){
            throw new NotFoundException()
        }
        if (user.id !== collection.authorId && user.role !== Role.SUPER){
            throw new ForbiddenException();
        }
        const updateData: any = {
            ...dto
        }
        if (dto.category){
            if (!this.categoryTemplate[dto.category]){
                throw new NotFoundException('There is no that category');
            }
            updateData.category = this.categoryTemplate[dto.category];
        }
        if (dto.goal){
            updateData.goal = Number(dto.goal);
        }
        if (photo){
            if (collection.photo){
                await this.photoService.deletePhotoByUrl(collection.photo);
            }
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
        if (collection.photo){
            await this.photoService.deletePhotoByUrl(collection.photo);
        }
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

        if (collection.title && collection.text && collection.photo && collection.payPalEmail && collection.goal && collection.category){
            return this.databaseService.cashCollection.update({where: {id}, data: {publish: true}});
        }
        throw new ConflictException('To publish your fund, you must fill in all fields')
    }

    async promote(id: string, user: JwtPayload){
        const collection = await this.databaseService.cashCollection.findUnique({where: {id}});
        if (!collection){
            throw new NotFoundException()
        }
        const rating = collection.rating;
        if (rating.includes(user.id)){
            throw new ConflictException('You have already promoted this fund')
        }
        await this.databaseService.cashCollection.update(
            {
                where: {id},
                data: {
                    rating: [...rating, user.id]
                }
            }
        )
        return {
            status: HttpStatus.OK,
            message: 'You promoted this fund'
        }
    }

    async changeState(id, amount){
        const collection = await this.findOne(id);
        if (!collection){
            throw new NotFoundException()
        }
        if (collection.state + amount > collection.goal){
            return this.databaseService.cashCollection.update({where: {id}, data: {state: collection.state + amount, achieved: true}})
        }
        return this.databaseService.cashCollection.update({where: {id}, data: {state: collection.state + amount}})
    }

    async getByCreator(id: string){
        return this.databaseService.cashCollection.findMany({
            where: {
                authorId: id,
                publish: true
            }
        })
    }
}
