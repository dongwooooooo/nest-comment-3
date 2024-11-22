import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentRequest {
  @ApiProperty({
    description: '작성자',
    example: '홍길동',
    minLength: 20,
  })
  @IsString()
  @Length(20)
  @IsNotEmpty()
  readonly writer: string;

  @ApiProperty({
    description: '작성글',
    example: '밥밥밥',
    minLength: 1000,
  })
  @IsString()
  @Length(1000)
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    description: '댓글 아이디',
    example: 1,
  })
  @IsNumber()
  readonly parentId?: number | null;

  @ApiProperty({
    description: '레벨',
    example: 1,
  })
  @IsNumber()
  readonly level?: number | null;

  @ApiProperty({
    description: '게시글 아이디',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly articleId: number;

  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
