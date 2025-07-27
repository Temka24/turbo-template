import pkg from "@prisma/client";
const { PrismaClient } = pkg;

export * from "@prisma/client";
export const db = new PrismaClient();
export const prismaClient = PrismaClient;
