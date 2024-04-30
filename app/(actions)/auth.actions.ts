"use server";
import { decode, sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import * as crypto from "crypto";
import {
    findAndRetrieveKey,
    getPasswordFrom,
    storeSecretKey,
} from "./db.actions";
import { UserData } from "@/types/types";
import { comparePasswords } from "./encryption";

export async function createSession(userName: string) {
    "use server";
    try {
        const jwt = await createJWT(userName);
        cookies().set({
            name: "secret-access-token",
            value: jwt!.token,
            httpOnly: true,
            secure: true,
            maxAge: 3600,
        });
        storeSecretKey(jwt!.key, userName);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * checks if the current user's stored session is still valid on the database
 */
export async function checkIfSessionIsValid() {
    "use server";
    try {
        const cookie = cookies().get("secret-access-token");
        if (!cookie) {
            return false;
        }
        const userName = decode(cookie.value) as string;
        const key = await findAndRetrieveKey(userName);
        if (!key) {
            throw new Error("unable to find user");
        }
        const isValid = await verifyToken(cookie.value, key);
        return isValid;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function verifyUserCredentials(formData: UserData) {
    try {
        const userName = formData.userName;
        const password = formData.password;
        const dbPassword = await getPasswordFrom(userName);
        if (!dbPassword) {
            throw new Error("User not found");
        }
        const isValidPassword = await comparePasswords(password, dbPassword);
        return isValidPassword;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function createJWT(userName: string) {
    "use server";
    try {
        const privateKey = await generateSecret();
        return { token: sign(userName, privateKey!), key: privateKey! };
    } catch (err) {
        console.error(err);
    }
}

export async function verifyToken(token: string, key: string) {
    "use server";
    try {
        verify(token, key);
        return true;
    } catch (err) {
        return false;
    }
}

async function generateSecret() {
    try {
        const key = crypto.randomBytes(32).toString("hex");
        return key;
    } catch (err) {
        console.error(err);
    }
}
