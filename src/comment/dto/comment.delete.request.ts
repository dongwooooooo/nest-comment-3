import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentDeleteRequest {
  @ApiProperty({
    description: '댓글 아이디',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  readonly commentId: number;

  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}