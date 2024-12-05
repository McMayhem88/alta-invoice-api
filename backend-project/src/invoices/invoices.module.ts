import {Module} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UsersModule} from "../users/users.module";
import {InvoicesController} from './invoices.controller';
import {InvoicesService} from './invoices.service';

@Module({
  imports: [UsersModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService]
})
export class InvoicesModule {
}
