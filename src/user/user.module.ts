import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CommentModule } from '@src/comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommentModule],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
