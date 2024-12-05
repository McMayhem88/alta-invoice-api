import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JWT_CONSTANTS} from "./auth.constants";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from './auth.controller';
import {ConfigModule, ConfigService} from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_CONSTANTS.secret),
        signOptions: {
          expiresIn: configService.get<string>(JWT_CONSTANTS.expiresIn),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
