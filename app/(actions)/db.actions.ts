"use server";
import { UserData } from "@/types/types";
import { prisma } from "@/prisma/prisma";

export async function createUser(formData: UserData) {
    "use server";
    try {
        await prisma.users.create({
            data: {
                userName: formData.userName,
                password: formData.password,
            },
        });
        prisma.$disconnect();
        return true;
    } catch (err) {
        console.error(err);
        prisma.$disconnect();
        return false;
    }
}

export async function storeSecretKey(key: string, userName: string) {
    "use server";
    try {
        prisma.$connect();
        await prisma.users.update({
            where: { userName },
            data: {
                secretKey: key,
            },
        });
        prisma.$disconnect();
    } catch (err) {
        console.error(err);
        prisma.$disconnect();
    }
}

export async function findAndRetrieveKey(userName: string) {
    try {
        prisma.$connect();
        const key = (await prisma.users.findFirst({ where: { userName } }))
            ?.secretKey;
        if (key) {
            prisma.$disconnect();
            return key;
        } else {
            prisma.$disconnect();
            throw new Error("server error or invalid user");
        }
    } catch (err) {
        console.error(err);
        prisma.$disconnect();
    }
}

export async function getPasswordFrom(userName: string) {
    try {
        prisma.$connect();
        const password = (await prisma.users.findFirst({ where: { userName } }))
            ?.password;
        if (password) {
            prisma.$disconnect();
            return password;
        }
        prisma.$disconnect();
        return null;
    } catch (err) {
        console.error(err);
        prisma.$disconnect();
        return null;
    }
}
