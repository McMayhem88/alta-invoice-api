import {IsInt, IsOptional, Min} from "class-validator";
import {Transform} from "class-transformer";

/**
 * DTO to validate pagination parameters passed to the invoice list function
 */
export class PaginationDto {
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  page?: number = 0; // `0` will be used as an indicator that pagination is disabled.
  
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  count?: number = 10;
}