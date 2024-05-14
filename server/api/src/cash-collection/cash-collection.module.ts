import { Module } from '@nestjs/common';
import { CashCollectionService } from './cash-collection.service';
import { CashCollectionController } from './cash-collection.controller';
import { PhotoService } from '@photo/photo.service';
import { PhotoModule } from '@photo/photo.module';

@Module({
  imports: [PhotoModule],
  providers: [CashCollectionService, PhotoService],
  exports: [CashCollectionService, PhotoService],  
  controllers: [CashCollectionController]
})
export class CashCollectionModule {}