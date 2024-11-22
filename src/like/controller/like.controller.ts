import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LikeRequest } from '../dto/like.dto';
import { LikeService } from '../service/like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @Post('/')
  @ApiOperation({ summary: '댓글 좋아요' })
  @ApiQuery({ type: LikeRequest })
  @HttpCode(200)
  async like(@Body() likeRequest: LikeRequest) {
    return await this.likeService.pushLike(likeRequest);
  }
}
