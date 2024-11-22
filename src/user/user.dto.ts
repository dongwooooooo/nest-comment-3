import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
    minLength: 5,
  })
  @IsString()
  @Length(5)
  readonly name: string;
}
