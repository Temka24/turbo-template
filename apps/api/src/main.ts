import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import compression from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { AppModule } from "./app.module";
import { AppConfigService } from "./config/app-config.service";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const adapter = new FastifyAdapter({ trustProxy: true, logger: false });

    await adapter.getInstance().register(fastifyCors, {
        origin: ["https://timelink.mn", "http://localhost:3000", "http://localhost:5000"],
        credentials: true,
    });
    await adapter.getInstance().register(compression, {
        encodings: ["br", "gzip", "deflate"],
    });
    await adapter.getInstance().register(fastifyHelmet);
    await adapter.getInstance().register(fastifyCookie);

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableShutdownHooks();

    const config = app.get(AppConfigService);

    if (config.isDev) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle("TimeLink API")
            .setDescription("Zod + Swagger (manual schema)")
            .setVersion("1.0")
            .addCookieAuth("token", {
                type: "apiKey",
                in: "cookie",
                name: "token", // Cookie name to saving JWT
                description: "JWT stored in HttpOnly cookie",
            })
            .addSecurity("csrf-token", {
                type: "apiKey",
                in: "header",
                name: "csrf-token",
            })
            .build();

        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup("/docs", app, document);
    }

    await app.listen(config.port, "0.0.0.0");

    ["SIGINT", "SIGTERM"].forEach((signal) => {
        process.on(signal, () => {
            void app.close();
        });
    });
}
void bootstrap();
