import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? this.normalizeMessage(exception.getResponse())
                : (exception as Error).message || "Unexpected error";

        this.logger.error(`[${request.method}] ${request.url} >> ${status} ${message}`);

        response.status(status).send({
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            msg: message,
        });
    }

    private normalizeMessage(response: unknown): string {
        if (typeof response === "string") return response;

        if (typeof response === "object" && response !== null && "message" in response) {
            const msg = response.message;
            if (Array.isArray(msg)) return msg.join(", ");
            if (typeof msg === "string") return msg;
        }

        return JSON.stringify(response);
    }
}
