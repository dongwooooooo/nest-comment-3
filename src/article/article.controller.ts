import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/user/user.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleDto } from './article.dto';

@Controller('article')
export class ArticleController {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'article 더미 생성' })
  @ApiBody({ type: ArticleDto })
  @HttpCode(201)
  async create(@Body() dto: ArticleDto) {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (user == undefined) {
      throw new Error('[ARTICLE ERROR] no user');
    }
    return await this.articleRepository.save(
      this.articleRepository.create({
        user: user,
      }),
    );
  }
}
