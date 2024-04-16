import { Module } from '@nestjs/common';
import { CashCollectionService } from './cash-collection.service';
import { CashCollectionController } from './cash-collection.controller';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  
  providers: [CashCollectionService, PhotoService],
  controllers: [CashCollectionController]
})
export class CashCollectionModule {}
