import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CommentService } from '../service/comment.service';
import { CreateCommentRequest } from '../dto/create.comment.request';
import { CommentDto } from '../dto/comment.dto';
import { CommentDeleteRequest } from '../dto/comment.delete.request';
import { PaginationDto } from '@src/util/pagination.dto';
import { Pagination } from '@src/util/decorator.pagination';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('/')
  @ApiOperation({ summary: '댓글, 대댓글 생성' })
  @ApiBody({ type: CreateCommentRequest })
  @HttpCode(201)
  async create(@Body() createCommentRequest: CreateCommentRequest) {
    return await this.commentService.createComment(createCommentRequest);
  }

  @Post('/find-all')
  @ApiOperation({ summary: '댓글 pagination 조회' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '페이지 크기',
  })
  @ApiBody({ type: CommentDto })
  @HttpCode(200)
  async findByPagination(
    @Pagination() paginationDto: PaginationDto,
    @Body() commentDto: CommentDto,
  ) {
    return await this.commentService.findAllComments(paginationDto, commentDto);
  }
  @Delete('/')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiQuery({ type: Pagination })
  @HttpCode(200)
  async delete(@Body() commentDeleteRequest: CommentDeleteRequest) {
    return await this.commentService.deletedComment(commentDeleteRequest);
  }
}
