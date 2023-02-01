import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly reportsRepo: Repository<Reports>,
  ) {}

  create(reportDto: CreateReportDto) {
    const report = this.reportsRepo.create(reportDto)

    return this.reportsRepo.save(report)
  }
}
