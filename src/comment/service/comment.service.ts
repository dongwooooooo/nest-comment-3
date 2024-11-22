import { BadRequestException, Injectable } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entity/comment.entity';
import { CreateCommentRequest } from '../dto/create.comment.request';
import { CommentDto } from '../dto/comment.dto';
import { CommentDeleteRequest } from '../dto/comment.delete.request';
import { PaginationDto } from '@src/util/pagination.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: TreeRepository<Comment>,
  ) {}

  async createComment(commentRequest: CreateCommentRequest) {
    const parent = await this.checkPaernetComment(commentRequest.parentId);
    const comment = await this.commentRepository.save(
      this.commentRepository.create({
        writer: commentRequest.writer,
        content: commentRequest.content,
        level: parent ? parent.level + 1 : 0,
        parent: parent || null,
        article: { id: commentRequest.articleId },
        user: { id: commentRequest.userId },
      }),
    );
    if (comment == undefined) {
      throw new BadRequestException('[COMMENT ERROR] 댓글 생성 오류');
    }
    return comment;
  }
  private async checkPaernetComment(parentId: number): Promise<Comment> {
    if (parentId != null) {
      return await this.commentRepository.findOne({
        where: { id: parentId },
      });
    }
    return null;
  }

  async findAllComments(paginationDto: PaginationDto, commentDto: CommentDto) {
    const { offset, limit, order } = paginationDto;
    const { parentId, articleId } = commentDto;
    const result = parentId
      ? await this.getChildComments(parentId, articleId, offset, limit, order)
      : await this.getParentComments(articleId, offset, limit, order);
    const curentPage = Math.ceil(offset / limit) + 1;
    const totalPage = Math.ceil(result.commentCount / limit);
    return {
      data: result.comments,
      page: curentPage,
      totalPage,
      limit,
    };
  }
  private async getParentComments(
    articleId: number,
    offset: number,
    limit: number,
    order: string,
  ): Promise<{ comments: Comment[]; commentCount: number }> {
    const [comments, commentCount] = await this.commentRepository.findAndCount({
      where: { parent: null, article: { id: articleId }, isDeleted: false },
      relations: ['article'],
      order: { createAt: order as 'ASC' | 'DESC' },
      skip: offset,
      take: limit,
    });
    return { comments, commentCount };
  }
  private async getChildComments(
    parentId: number,
    articleId: number,
    offset: number,
    limit: number,
    order: string,
  ): Promise<{ comments: Comment[]; commentCount: number }> {
    const [comments, commentCount] = await this.commentRepository.findAndCount({
      where: {
        parent: { id: parentId },
        article: { id: articleId },
        isDeleted: false,
      },
      relations: ['parent', 'article'],
      order: { createAt: order as 'ASC' | 'DESC' },
      skip: offset,
      take: limit,
    });
    return { comments, commentCount };
  }

  async deletedComment(commentDeleteRequest: CommentDeleteRequest) {
    const selectedComment = await this.commentRepository.findOne({
      where: {
        id: commentDeleteRequest.commentId,
        user: { id: commentDeleteRequest.userId },
      },
      relations: ['user'],
    });
    if (selectedComment == undefined) {
      throw new BadRequestException('[COMMENT DELETE] no comment');
    }
    this.commentRepository.remove(selectedComment);
  }
}
