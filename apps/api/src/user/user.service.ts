import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { AppConfigService } from "src/config/app-config.service";
import { UserSchema } from "@repo/validation";
import type { CreateUserInput, User, UpdateUserInput } from "@repo/validation";

const userSelect = { id: true, username: true, email: true };

@Injectable()
export class UserService {
    constructor(
        private readonly appConfig: AppConfigService,
        private readonly prisma: PrismaService,
    ) {}

    async create(body: CreateUserInput): Promise<User> {
        const user = await this.prisma.user.create({
            data: body,
            select: userSelect,
        });
        return UserSchema.parse(user);
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: userSelect,
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }
        return UserSchema.parse(user);
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({ select: userSelect });

        if (!users) {
            throw new NotFoundException("Users not found");
        }

        if (!this.appConfig.isDev) {
            console.log("This is Production bro");
        } else {
            console.log("This is Dev bro");
        }

        const parserUsers = users.map((user) => UserSchema.parse(user));

        return parserUsers;
    }

    async update(id: string, body: UpdateUserInput): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id },
            data: body,
            select: userSelect,
        });
        if (!user) {
            throw new NotFoundException("Users not found");
        }
        return UserSchema.parse(user);
    }

    async remove(id: string): Promise<User> {
        const user = await this.prisma.user.delete({ where: { id }, select: userSelect });
        if (!user) {
            throw new NotFoundException("Users not found");
        }
        return UserSchema.parse(user);
    }
}
