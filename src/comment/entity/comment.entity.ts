import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm';
import { Report } from '@src/report/entity/report.entity';
import { Like } from '@src/like/entity/like.entity';

@Entity()
@Tree('closure-table')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 20 })
  writer: string;
  @Column({ length: 1000 })
  content: string;
  @TreeParent()
  parent: Comment;
  @TreeChildren()
  children: Comment[];
  @TreeLevelColumn()
  @Column({ default: 0 })
  level: number;
  @Column({ default: 0 })
  likeCount: number;
  @Column({ default: 0 })
  complainCount: number;
  @CreateDateColumn()
  createAt: Date;
  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Like, (like) => like.comment, {
    cascade: true,
  })
  likes: Like[];

  @OneToMany(() => Report, (complain) => complain.comment, {
    cascade: true,
  })
  reports: Report[];

  @ManyToOne(() => Article, (article) => article.comments, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User;
}
