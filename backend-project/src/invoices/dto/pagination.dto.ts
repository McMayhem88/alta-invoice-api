import {IsInt, IsOptional, Min} from "class-validator";
import {Transform} from "class-transformer";

/**
 * DTO to validate pagination parameters passed to the invoice list function
 */
export class PaginationDto {
  /**
   * Represents the current page of the pagination
   */
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  page?: number = 0; // `0` will be used as an indicator that pagination is disabled.
  
  /**
   * The maximum number of records that can be displayed on a single page when paginated
   */
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  count?: number = 10;
}