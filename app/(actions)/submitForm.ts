"use server";
import { UserData } from "@/types/types";
import { createUser } from "./db.actions";
import { userSchema } from "../(schemas)/user.schema";
import { getHashedString } from "./encryption";
import { createSession, verifyUserCredentials } from "./auth.actions";

/**
 *
 * @param {string} msg a message to be displayed
 * @param {number} status the http status to be sent
 * @returns {string} a JSON string
 */
function res(msg: string, status: number): string {
    return JSON.stringify({
        message: msg,
        status,
    });
}

export default async function submitSignUpForm(
    formData: UserData,
): Promise<string> {
    "use server";

    try {
        await userSchema.validate(formData);
    } catch (err) {
        const errorMessages = (err as { errors: Array<string> }).errors;
        const stringErr = JSON.stringify(errorMessages);
        return res(stringErr, 403);
    }

    let hashedPassword: string;

    try {
        hashedPassword = await getHashedString(formData.password);
    } catch (err) {
        return res("Error creating user", 500);
    }

    const secureUserData: UserData = {
        userName: formData.userName,
        password: hashedPassword,
    };

    try {
        const success = await createUser(secureUserData);
        if (success) {
            return res("User created successfully", 201);
        } else {
            return res("Username already taken", 403);
        }
    } catch (err) {
        return res("Username already taken", 403);
    }
}

export async function submitLoginForm(formData: UserData) {
    try {
        const isValidUser = await verifyUserCredentials(formData);
        if (isValidUser) {
            const success = await createSession(formData.userName);
            if (success) {
                return true;
            }
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}
