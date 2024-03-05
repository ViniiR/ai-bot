import { UserData } from "@/types/types";
import { prisma } from "@/prisma/prisma";

export async function createUser(formData: UserData) {
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
