import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { CashCollectionService } from '@cash-collection/cash-collection.service';
import { CashCollectionModule } from '@cash-collection/cash-collection.module';

@Module({
  imports: [CashCollectionModule],
  providers: [TransactionService, CashCollectionService],
  controllers: [TransactionController]
})
export class TransactionModule {}
