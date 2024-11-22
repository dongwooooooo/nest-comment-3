import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReportRequest {
  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
  @ApiProperty({
    description: '댓글 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly commentId: number;
}
