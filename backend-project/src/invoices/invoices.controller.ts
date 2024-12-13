import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import {InvoicesService} from './invoices.service';
import {UsersService} from "../users/users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {InvoiceIdDto} from "./dto/invoice-id.dto";
import {Invoice} from "@prisma/client";
import {PaginationDto} from "./dto/pagination.dto";
import {Util} from "../utils/utils";
import {ResultData} from "./interfaces/invoices.interfaces";

/**
 * Controller class for handling REST endpoints for querying invoices
 */
@Controller('invoices')
export class InvoicesController {
  constructor(
    private usersService: UsersService, //@@ - Utilized for validating the current user
    private invoicesService: InvoicesService
  ) {
  }
  
  /**
   * Returns all invoices in the database for the currently logged-in user
   * @param req The request object to pull the current user from
   * @param pagination Object representing query parameters to specify pagination options
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllInvoices(@Request() req, @Query() pagination?: PaginationDto): Promise<ResultData> {
    const userId = await this.validateUserId(req.user?.userId || null);
    return await this.invoicesService.findAllByUser(userId, pagination);
  }
  
  /**
   * Returns a list of aggregated totals of invoices grouped by due date
   * @param req The request object to pull the current user from
   */
  @UseGuards(JwtAuthGuard)
  @Get('total')
  async getTotalsByDueDate(@Request() req): Promise<Invoice[]> {
    const userId = await this.validateUserId(req.user?.userId || null);
    const totals = await this.invoicesService.getTotalByDueDate(userId);
    if (Util.isNullOrEmpty(totals)) { //!! Probably not necessary to throw an error here, in the case this is a new user
      throw new NotFoundException("No results found for the current user");
    }
    return totals;
  }
  
  /**
   * Returns a single invoice from the database using the provided `id`
   * @param params Object representing the input parameters for the query (`id`)
   * @param req The request object to pull the current user from
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getInvoiceById(@Param() params: InvoiceIdDto, @Request() req): Promise<Invoice> {
    const {id} = params;
    const userId = await this.validateUserId(req.user?.userId || null);
    const invoice = await this.invoicesService.findOneByIdAndUser(+id, userId);
    if (Util.isNullOrEmpty(invoice)) {
      throw new NotFoundException();
    }
    return invoice;
  }
  
  /**
   * Returns a validated ID from the given parameter that has been sanitized,
   * transformed and validated against the user table. This method guarantees
   * that the returned ID is valid and represents an actual user in the
   * database.
   * @param id The user ID to validate
   * @throws {BadRequestException} If the provided `id` is not parsable as an
   * integer or no such user exists in the database.
   * @return Validated ID that represents an actual user
   */
  private async validateUserId(id: any) {
    const userId = Util.tryParseInt(id, -1);
    if (userId < 0) {
      throw new BadRequestException("Could not find a user");
    }
    
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new BadRequestException("Could not validate current user");
    }
    
    return userId;
  }
}
