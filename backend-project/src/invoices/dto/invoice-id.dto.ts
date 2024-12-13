import {IsInt, Min} from "class-validator";
import {Type} from 'class-transformer';

/**
 * DTO for invoice input validation
 */
export class InvoiceIdDto { //!! I really only use DTOs for more complex objects and POST endpoints, but I felt it was necessary
  @Type(() => Number)
  @IsInt({message: 'Invoice ID must be a number'})
  @Min(0)
  id: number;
}