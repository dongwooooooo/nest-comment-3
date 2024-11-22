import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from '../entity/report.entity';
import { ReportRequest } from '../dto/report.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@src/comment/entity/comment.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async complain(complainRequest: ReportRequest) {
    const complain = this.reportRepository.create({
      comment: { id: complainRequest.commentId },
      user: { id: complainRequest.userId },
    });
    try {
      await this.reportRepository.save(complain);
    } catch (error) {
      throw new BadRequestException['[COMPLAIN ERROR] exist complain']();
    }
    const complainCount = await this.reportRepository.count({
      where: { comment: { id: complainRequest.commentId } },
    });
    const comment = await this.commentRepository.findOne({
      where: { id: complainRequest.commentId },
    });
    comment.complainCount = complainCount;
    if (comment.complainCount >= 10) {
      comment.isDeleted = true;
    }
    return await this.commentRepository.save(comment);
  }
}
