import { Module } from '@nestjs/common';
import { CashCollectionService } from './cash-collection.service';
import { CashCollectionController } from './cash-collection.controller';

@Module({
  providers: [CashCollectionService],
  controllers: [CashCollectionController]
})
export class CashCollectionModule {}
