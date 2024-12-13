import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JWT_CONSTANTS} from "./auth.constants";
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";

/**
 * JWT authentication strategy class to handle user validation and token configuration
 */
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
  
  /**
   * Called automatically when a user tries to access an endpoint using a JWT guard
   * @param payload
   */
  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.username);
    if (!user) {
      throw new UnauthorizedException("Unable to validate credentials");
    }
    return {userId: payload.sub, email: payload.username};
  }
}