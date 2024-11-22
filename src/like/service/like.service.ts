import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikeRequest } from '../dto/like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from '../entity/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async pushLike(likeRequest: LikeRequest) {
    const newLike = this.likeRepository.create({
      comment: { id: likeRequest.commentId },
      user: { id: likeRequest.userId },
    });
    try {
      await this.likeRepository.save(newLike);
    } catch (error) {
      throw new Error('[LIKE] exist like');
    }
    return await this.likeRepository.count({
      where: { comment: { id: likeRequest.commentId } },
    });
  }
}
