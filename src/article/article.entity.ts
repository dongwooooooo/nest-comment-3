import { Comment } from 'src/comment/entity/comment.entity';
import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Comment, (comment) => comment.article, {
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: 'CASCADE',
  })
  user: User;
}
