import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CloudinaryProvider } from './photo.provider';

@Module({
  providers: [PhotoService, CloudinaryProvider],
  exports: [PhotoService, CloudinaryProvider]
})
export class PhotoModule {}
