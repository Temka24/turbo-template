import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});

const BaseUserSchema = CreateUserSchema.omit({ password: true });

export const UserSchema = BaseUserSchema.extend({
    id: z.string().uuid(),
});

export const UpdateUserSchema = CreateUserSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided",
    },
);

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type User = z.infer<typeof UserSchema>;
