import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JWT_CONSTANTS} from "./auth.constants";
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_CONSTANTS.secret),
    });
  }
  
  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.username);
    if (!user) {
      throw new UnauthorizedException("Unable to validate credentials");
    }
    return {userId: payload.sub, email: payload.username};
  }
}