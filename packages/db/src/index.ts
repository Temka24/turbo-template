import { PrismaClient, Prisma } from "@prisma/client";

export class DbPrismaClient extends PrismaClient {
    constructor(options?: Prisma.PrismaClientOptions) {
        super(options);
    }
}

export const db = new DbPrismaClient();
export * from "@prisma/client";
