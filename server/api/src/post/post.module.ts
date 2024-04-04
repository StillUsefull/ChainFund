import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [PhotoService]
})
export class PostModule {}
