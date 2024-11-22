import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ReportRequest as ReportRequest } from '../dto/report.request';
import { ReportService as ReportService } from '../service/report.service';

@Controller('complain')
export class ReportController {
  constructor(private readonly complainService: ReportService) {}
  @Post('/complain')
  @ApiOperation({ summary: '댓글 신고' })
  @ApiQuery({ type: ReportRequest })
  @HttpCode(200)
  async complain(@Body() complainRequest: ReportRequest) {
    return await this.complainService.complain(complainRequest);
  }
}
