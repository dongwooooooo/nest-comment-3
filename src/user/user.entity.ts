import { Article } from 'src/article/article.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '@src/report/entity/report.entity';
import { Like } from '@src/like/entity/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Article, (article) => article.user, {
    cascade: true,
  })
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user, {
    cascade: true,
  })
  likes: Like[];

  @OneToMany(() => Report, (complain) => complain.user, {
    cascade: true,
  })
  reports: Report[];
}
