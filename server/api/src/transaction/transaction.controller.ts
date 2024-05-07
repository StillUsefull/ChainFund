import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { Public, UserDecorator } from '@common/decorators';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
    
    constructor(private readonly transactionService: TransactionService){}

    @Post('/payout/:id')
    createPayout(@Param('id') id: string, @Body('amount') amount: string, @UserDecorator() user: JwtPayload){
        return this.transactionService.create(id, amount, user);
    }

    @Get()
    getMy(@UserDecorator() user: JwtPayload){
        return this.transactionService.getMy(user);
    }


    @Public()
    @Get('/export/:id')
    async export(@Param('id') collectionId: string, @Res() res: Response){
        return this.transactionService.createExcelFile(collectionId, res);
    }
}
