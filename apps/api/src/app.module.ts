import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validateEnv } from "./config/zod-validation";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { PostModule } from "./post/post.module";
import { CoreModule } from "./core/core.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: validateEnv,
        }),
        CoreModule,
        UserModule,
        TaskModule,
        PostModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
