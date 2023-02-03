import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate-dto';
import { Reports } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly reportsRepo: Repository<Reports>,
  ) {}

  create(reportDto: CreateReportDto) {
    const report = this.reportsRepo.create(reportDto);

    return this.reportsRepo.save(report);
  }

  async changeApproval(id: string, body: boolean) {
    const report = await this.reportsRepo.findOne({ where: { id: +id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = body;

    return this.reportsRepo.save(report);
  }

  estimate(query: GetEstimateDto) {
    return this.reportsRepo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .orderBy('mileage - :mileage')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}
