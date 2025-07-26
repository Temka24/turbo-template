import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private config: ConfigService) {}

    get port(): number {
        return this.config.get<number>("PORT")!;
    }

    get databaseUrl(): string {
        return this.config.get<string>("DATABASE_URL")!;
    }

    get isDev(): boolean {
        return this.config.get<string>("NODE_ENV")! === "development";
    }
}
