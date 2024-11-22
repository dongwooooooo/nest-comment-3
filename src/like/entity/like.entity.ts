import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Comment } from '../comment/entity/comment.entity';

@Entity()
@Unique(['user', 'comment'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  comment: Comment;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  user: User;
}
