import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Invoice} from "@prisma/client";
import {PaginationDto} from "./dto/pagination.dto";
import {ResultData} from "./interfaces/invoices.interfaces";

/**
 * Service class for handling invoice query operations
 */
@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {
  }
  
  /**
   * Returns a single invoice in the database using the provided `id`
   * @param id The unique `id` of the invoice to pull
   */
  async findById(id: number): Promise<Invoice> {
    return this.prisma.invoice.findUnique({ //!! Didn't end up using this, probably should have removed it
      where: {id},
    });
  }
  
  /**
   * Return all invoices in the database belonging to the user with the provided `userId`. The provided pagination
   * parameters determine how paginated results are handled.
   * @param userId The unique `id` of the user to pull invoices for
   * @param paginationDto Parameters determining options for pagination (`page` and `count`)
   */
  async findAllByUser(userId: number, paginationDto: PaginationDto): Promise<ResultData> {
    const {
      /** Represents the current page to pull results for */
      page,
      /** The max number of results per page. Used to offset the result set based on the `page` value. */
      count
    } = paginationDto;
    
    // Create the initial result data to be returned with default values
    const resultData: ResultData = {
      results: [],
      total: 0,
      page: page || 0,
      isLastPage: true
    };
    
    // Set up the query data to use when pulling the invoices
    const queryData = {
      where: {
        user_id: userId
      },
      orderBy: {
        due_date: "desc" // Sort the invoices in descending order of `due_date`
      } as any,
    };
    
    // Check if pagination is being used and add the necessary parameters to the query
    if (page > 0) {
      // We are using pagination if the page number is greater than 0
      const offset = (page - 1) * count;
      queryData['take'] = count; // Pull the number of results we can display on a single page
      queryData['skip'] = offset; // Offset the current result set based on the current page we are on
    }
    
    
    //!! Looking back at this, I probably wouldn't have done it this way. This method involves querying the database two
    // times for roughly the same data. Instead, I would query the database for all the results and handle the
    // pagination here in the business logic.
    const [
      /** The returned invoice records from the database (paginated) */
      results,
      /** The total number of results that exist in the database (not paginated) */
      total
    ] = await Promise.all([
      this.prisma.invoice.findMany(queryData),
      this.prisma.invoice.count({
        where: {
          user_id: userId
        }
      }),
    ]);
    
    // Set the result data values
    resultData.results = results;
    resultData.total = total;
    if (page > 0) {
      // Determine if this is the last page
      resultData.isLastPage = (page * count) >= total;
    }
    
    return resultData;
  }
  
  /**
   * Returns a single invoice using the provided invoice `id` for the user with the provided `userId`
   * @param id The unique `id` of the invoice to pull
   * @param userId The unique `id` of the user the invoice belongs to
   */
  async findOneByIdAndUser(id: number, userId: number): Promise<Invoice> {
    //@@ By using both the invoice `id` and the user `id` we add a layer of security to make sure the invoice being
    // requested actually belongs to the current user
    return this.prisma.invoice.findUnique({
      where: {id, user_id: userId},
    });
  }
  
  /**
   * Returns a list of aggregated totals of invoices grouped by due date for the user with the provided `userId`
   * @param userId The unique `id` of the user to pull invoice totals for
   */
  async getTotalByDueDate(userId: number): Promise<any> {
    return this.prisma.invoice.groupBy({
      by: ['due_date'], // Group the aggregated results by `due_date`
      where: {user_id: userId},
      orderBy: {due_date: 'desc'}, // Order the results in descending order of `due_date`
      _sum: {
        amount: true, // Pull the aggregated sum of the grouped invoices as the total
      }
    });
  }
}
