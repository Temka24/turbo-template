import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());

    await app.listen(process.env.PORT || 5001, "0.0.0.0");
}
void bootstrap();
