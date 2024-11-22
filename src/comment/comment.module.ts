import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [TypeOrmModule],
})
export class CommentModule {}
