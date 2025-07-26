import { Controller, Get, Post, Param, Put, Delete, Body, ParseUUIDPipe } from "@nestjs/common";
import {
    ApiTags,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiCookieAuth,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserSchema, UpdateUserSchema } from "@repo/validation";
import type { CreateUserInput, UpdateUserInput } from "@repo/validation";
import { ZodValidationPipe } from "src/common/pipes/zod.pipe";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: "Create a new user" })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                username: { type: "string", example: "Joe" },
                email: { type: "string", format: "email", example: "joe@gmail.com" },
                password: { type: "string", format: "password", example: "secret1234" },
            },
            required: ["username", "email", "password"],
        },
    })
    @ApiResponse({
        status: 201,
        description: "User created",
        schema: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid", example: "c234-..." },
                username: { type: "string", example: "joe" },
                email: { type: "string", example: "joe@mail.com" },
            },
        },
    })
    create(@Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserInput) {
        return this.userService.create(body);
    }

    @Get()
    @ApiOperation({ summary: "Get all users" })
    @ApiResponse({
        status: 200,
        description: "List of all users",
        schema: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid", example: "c234..." },
                    username: { type: "string", example: "joe" },
                    email: { type: "string", example: "joe@mail.com" },
                },
            },
        },
    })
    findAll() {
        return this.userService.findAll();
    }

    @ApiCookieAuth("token") // 👈 Swagger UI-д "Authorize" товч гарна
    @Get(":id")
    @ApiOperation({ summary: "Get user by id" })
    @ApiParam({ name: "id", type: "string", format: "uuid" })
    @ApiResponse({
        status: 200,
        description: "User found",
        schema: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid", example: "c234..." },
                username: { type: "string", example: "joe" },
                email: { type: "string", example: "joe@mail.com" },
            },
        },
    })
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.findOne(id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update user by id" })
    @ApiParam({ name: "id", type: "string", format: "uuid" })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                username: { type: "string", example: "joe" },
                email: { type: "string", example: "joe@mail.com" },
                password: { type: "string", example: "pass" },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: "User updated",
        schema: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid", example: "c234..." },
                username: { type: "string", example: "joe" },
                email: { type: "string", example: "joe@mail.com" },
            },
        },
    })
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body(new ZodValidationPipe(UpdateUserSchema)) body: UpdateUserInput,
    ) {
        return this.userService.update(id, body);
    }

    @ApiOperation({ summary: "Delete user by id" })
    @ApiParam({ name: "id", type: "string", format: "uuid" })
    @ApiResponse({
        status: 204,
        description: "User deleted",
        schema: {
            type: "object",
            properties: {
                id: { type: "string", format: "uuid", example: "c234..." },
                username: { type: "string", example: "joe" },
                email: { type: "string", example: "joe@mail.com" },
            },
        },
    })
    @Delete(":id")
    delete(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.remove(id);
    }

    @Get("/debug")
    testCompress() {
        return {
            message: "Compress test",
            longData: Array(1000).fill("Nested SaaS Fastify Adapter Enterprise").join(" "),
        };
    }
}
