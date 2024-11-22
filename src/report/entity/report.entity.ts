import { Comment } from '@src/comment/entity/comment.entity';
import { User } from '@src/user/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['comment', 'user'])
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Comment, (comment) => comment.reports, {
    onDelete: 'CASCADE',
  })
  comment: Comment;
  @ManyToOne(() => User, (user) => user.reports, {
    onDelete: 'CASCADE',
  })
  user: User;
}
