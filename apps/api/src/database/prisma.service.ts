import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { prismaClient } from "@repo/db";
import { AppConfigService } from "../config/app-config.service";

@Injectable()
export class PrismaService extends prismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor(private readonly config: AppConfigService) {
        super({
            datasources: {
                db: { url: config.databaseUrl },
            },
            log: ["query", "warn", "error"],
        });
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
