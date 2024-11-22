import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';
import { Report } from './report/entity/report.entity';
import { User } from './user/user.entity';
import { Comment } from './comment/entity/comment.entity';
import { ArticleModule } from './article/article.module';
import { Article } from './article/article.entity';
import { Like } from './like/entity/like.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [Comment, Report, Like, User, Article],
          synchronize: process.env.DB_SYNC === 'true',
          timezone: 'Z',
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    CommentModule,
    LikeModule,
    ReportModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
