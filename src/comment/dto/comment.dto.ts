import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    description: '부모 댓글 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  parentId?: number;

  @ApiProperty({
    description: '게시글 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  articleId?: number;
}
