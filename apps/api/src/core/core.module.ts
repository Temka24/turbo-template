import { Module } from "@nestjs/common";
import { AppConfigService } from "../config/app-config.service";
import { PrismaService } from "../database/prisma.service";

@Module({
    providers: [AppConfigService, PrismaService],
    exports: [AppConfigService, PrismaService],
})
export class CoreModule {}
