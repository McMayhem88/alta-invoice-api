import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

/**
 * Custom `AuthGuard` class to use for JWT authentication
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
}