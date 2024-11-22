import { Module } from '@nestjs/common';
import { ReportController } from './controller/report.controller';
import { ReportService } from './service/report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entity/report.entity';
import { CommentModule } from '@src/comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), CommentModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
