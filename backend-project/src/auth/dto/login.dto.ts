import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

/**
 * DTO for type validation of login input
 */
export class LoginDto {
  @IsEmail({}, {message: 'Email address is not valid'})
  email: string;
  
  @IsNotEmpty({message: 'Password is required'})
  @MinLength(8, {message: 'Password must be at least 8 characters long'})
  @MaxLength(20, {message: 'Password be no more than 20 characters long'})
  password: string;
}