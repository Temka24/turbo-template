import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [CoreModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
