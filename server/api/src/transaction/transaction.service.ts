import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CashCollectionService } from '@cash-collection/cash-collection.service';
import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {

    constructor(private readonly databaseService: DatabaseService, private readonly cashCollectionService: CashCollectionService){}

    async create(id: string, amount: string, user: JwtPayload){
        const createObject: any = {
            amount: Number(amount),
            cashCollectionId: id,
            userId: user.id
        }

        
        await this.cashCollectionService.changeState(id, Number(amount));
        return this.databaseService.transaction.create({data: {...createObject}})
    }


    getMy(user: JwtPayload){
        return this.databaseService.transaction.findMany({where: {userId: user.id}})
    }
}
