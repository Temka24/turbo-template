import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";
import { AppConfigService } from "../config/app-config.service";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor(private readonly config: AppConfigService) {
        const options: Prisma.PrismaClientOptions = {
            datasources: {
                db: { url: config.databaseUrl },
            },
            log: ["query", "warn", "error"],
        };

        super(options);
    }

    async onModuleInit() {
        await this.$connect();
        this.logger.log("Connected to DB");
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log("Disconnected from DB");
    }
}
