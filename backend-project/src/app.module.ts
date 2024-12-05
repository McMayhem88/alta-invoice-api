import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';
import {InvoicesModule} from './invoices/invoices.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    InvoicesModule
  ],
  providers: [ConfigService],
})
export class AppModule {
}
