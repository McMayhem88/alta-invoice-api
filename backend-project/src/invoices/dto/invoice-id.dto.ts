import {IsInt, Min} from "class-validator";
import {Type} from 'class-transformer';

export class InvoiceIdDto {
  @Type(() => Number)
  @IsInt({message: 'Invoice ID must be a number'})
  @Min(0)
  id: number;
}