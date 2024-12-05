import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Invoice} from "@prisma/client";
import {PaginationDto} from "./dto/pagination.dto";
import {ResultData} from "./interfaces/invoices.interfaces";

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {
  }
  
  async findById(id: number): Promise<Invoice> {
    return this.prisma.invoice.findUnique({
      where: {id},
    });
  }
  
  async findAllByUser(userId: number, paginationDto: PaginationDto): Promise<ResultData> {
    const {page, count} = paginationDto;
    
    const resultData: ResultData = {
      results: [],
      total: 0,
      page: page || 0,
      isLastPage: true
    };
    
    const queryData = {
      where: {
        user_id: userId
      },
      orderBy: {
        due_date: "desc"
      } as any,
    };
    
    if (page > 0) {
      // We are using pagination
      const offset = (page - 1) * count;
      queryData['take'] = count;
      queryData['skip'] = offset;
    }
    
    const [results, total] = await Promise.all([
      this.prisma.invoice.findMany(queryData),
      this.prisma.invoice.count({
        where: {
          user_id: userId
        }
      }),
    ]);
    
    resultData.results = results;
    resultData.total = total;
    if (page > 0) {
      resultData.isLastPage = (page * count) >= total;
    }
    
    return resultData;
  }
  
  async findOneByIdAndUser(id: number, userId: number): Promise<Invoice> {
    return this.prisma.invoice.findUnique({
      where: {id, user_id: userId},
    });
  }
  
  async getTotalByDueDate(userId: number): Promise<any> {
    return this.prisma.invoice.groupBy({
      by: ['due_date'],
      where: {user_id: userId},
      orderBy: {due_date: 'desc'},
      _sum: {
        amount: true,
      }
    });
  }
}
