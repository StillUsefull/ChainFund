import { Body, Controller, Post } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {

    @Post('payout')
    createPayout(@Body() body){
        return body
    }
}
