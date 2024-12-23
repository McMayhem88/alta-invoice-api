import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";

/**
 * Controller to handle endpoints for user login and authentication
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }
}