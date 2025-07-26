import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ZodType, ZodError } from "zod";

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly schema: ZodType<T>) {}

    transform(value: unknown): T {
        try {
            return this.schema.parse(value);
        } catch (err) {
            if (err instanceof ZodError) {
                throw new BadRequestException(err.format());
            }
            throw err;
        }
    }
}
