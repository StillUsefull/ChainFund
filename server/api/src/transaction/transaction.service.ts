import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { CashCollectionService } from '@cash-collection/cash-collection.service';
import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { Response } from 'express';
@Injectable()
export class TransactionService {

    constructor(private readonly databaseService: DatabaseService, private readonly cashCollectionService: CashCollectionService){}

    async create(id: string, amount: string, user: JwtPayload){
        const createObject: any = {
            amount: Number(amount),
            cashCollectionId: id,
            userId: user.id
        }

        
        return Promise.all([
            this.cashCollectionService.changeState(id, Number(amount)), 
            this.databaseService.transaction.create({data: {...createObject}})
        ])
    }


    getMy(user: JwtPayload){
        return this.databaseService.transaction.findMany({where: {userId: user.id}})
    }

    

    async createExcelFile(collectionId: string, res: Response) {

        const transactions = await this.databaseService.transaction.findMany({
            where: { cashCollectionId: collectionId }
        });
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Transactions');
    
        
        worksheet.columns = [
            { header: 'Transaction', key: 'id', width: 10 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 20 },
            { header: 'User', key: 'userId', width: 20 },
            { header: 'Fund', key: 'cashCollectionId', width: 20 }  
        ];
    
        
        transactions.forEach(transaction => {
            worksheet.addRow({
                id: transaction.id,
                amount: transaction.amount,
                date: transaction.createdAt,
                userId: transaction.userId,  
                cashCollectionId: transaction.cashCollectionId  
            });
        });
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="Transactions.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    }
}
