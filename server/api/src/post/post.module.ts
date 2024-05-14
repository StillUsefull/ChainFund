import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PhotoModule } from '@photo/photo.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [PhotoModule]
})
export class PostModule {}
