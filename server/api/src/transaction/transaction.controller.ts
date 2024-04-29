import { JwtPayload } from '@auth/interfaces/JwtPayload';
import { UserDecorator } from '@common/decorators';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

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
}
