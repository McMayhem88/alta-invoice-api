import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

/**
 * Service class to inject in the app module to allow all submodules to utilize the {@link PrismaClient}
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Called when the module is initialized
  async onModuleInit() {
    await this.$connect();
  }
  // Called when the module is shut down
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

