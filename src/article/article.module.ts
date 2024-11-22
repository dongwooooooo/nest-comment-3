import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
