import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production", "test"]).optional(),
    NEXT_PUBLIC_ENV: z.enum(["development", "production", "test"]).optional(),
    PORT: z.coerce.number().default(5000),
    NEXT_PUBLIC_TEST: z.string(),
});
