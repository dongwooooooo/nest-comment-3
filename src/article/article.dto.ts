import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ArticleDto {
  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  @IsNumber()
  readonly userId: number;
}
