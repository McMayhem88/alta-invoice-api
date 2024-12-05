import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }
  
  async login(loginDto: LoginDto) {
    const {email, password} = loginDto;
    
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    
    const payload = {username: user.email, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}