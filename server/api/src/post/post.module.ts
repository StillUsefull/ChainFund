import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PhotoService } from 'src/photo/photo.service';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [PhotoModule]
})
export class PostModule {}
