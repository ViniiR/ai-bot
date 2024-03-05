"use server";
import { UserData } from "@/types/types";
import { createUser } from "./db.actions";

const res = (msg: string, status: number) => {
    return JSON.stringify({
        message: msg,
        status,
    });
};

export default async function submitForm(formData: UserData): Promise<string> {
    "use server";
    if (!formData || !formData.password || !formData.userName) {
        return res("Invalid data", 400);
    }
    if (formData.password.length < 8) {
        return res("Password too short", 400);
    }
    if (formData.userName.length < 2) {
        return res("Username too short", 400);
    }
    try {
        const success = await createUser(formData);
        if (success) {
            return res("User created successfully", 201);
        } else {
            return res("Username already taken", 403);
        }
    } catch (err) {
        return res("Username already taken", 403);
    }
}
