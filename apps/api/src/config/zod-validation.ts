import { envSchema } from "@repo/validation";
import { z } from "zod";

export function validateEnv(config: Record<string, unknown>) {
    const result: z.SafeParseReturnType<
        typeof config,
        z.infer<typeof envSchema>
    > = envSchema.safeParse(config);

    if (!result.success) {
        console.error("❌ Invalid environment variables:");
        console.error(result.error.format());
        throw new Error("Invalid environment variables");
    }

    return result.data;
}
