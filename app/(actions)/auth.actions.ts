"use server";
import { decode, sign, verify } from "jsonwebtoken";
import { comparePasswords, getHashedString } from "./encryption";
import { UserData } from "@/types/types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as crypto from "crypto";
import {
    deleteUser,
    findAndRetrieveKey,
    getPasswordFrom,
    storeSecretKey,
    updateName,
    updatePassword,
    userExists,
} from "./db.actions";

export async function changePassword(password: string) {
    try {
        const newPassword = password.trim();
        if (!newPassword) {
            return {
                status: 400,
                message: "No Password provided",
            };
        }
        if (newPassword.length < 8) {
            return {
                status: 400,
                message: "Password too short",
            };
        }
        const cookie = cookies().get("secret-access-token");
        if (!cookie) {
            return {
                status: 403,
                message: "Invalid access key",
            };
        }

        const userName = decode(cookie.value) as string;
        const oldPassword = await getPasswordFrom(userName);
        if (await comparePasswords(password, oldPassword!)) {
            return {
                status: 400,
                message: "New Password cannot be the same as the old one",
            };
        }

        const hashedNewPassword = await getHashedString(password);

        const success = await updatePassword(userName, hashedNewPassword);
        if (success) {
            return {
                status: 200,
                message: "Password changed successfully",
            };
        }
        return {
            status: 500,
            message: "Failed to change Password",
        };
    } catch (err) {
        console.error(err);
        return {
            status: 500,
            message: "Internal server error",
        };
    }
}

export async function changeUserName(name: string) {
    try {
        const newName = name.trim();
        if (!newName) {
            return {
                status: 400,
                message: "No UserName provided",
            };
        }
        if (newName.length < 3) {
            return {
                status: 400,
                message: "UserName too short",
            };
        }
        const cookie = cookies().get("secret-access-token");
        if (!cookie) {
            return {
                status: 403,
                message: "Invalid access key",
            };
        }

        const conflictedName = await userExists(newName);
        if (conflictedName) {
            return {
                status: 400,
                message: "UserName already in use",
            };
        }

        const oldName = decode(cookie.value) as string;
        if (newName === oldName) {
            return {
                status: 400,
                message: "New UserName cannot be the same as the old one",
            };
        }

        const success = await updateName(oldName, newName);
        if (success) {
            const isSession = await createSession(newName);
            if (isSession) {
                return {
                    status: 200,
                    message: "UserName changed successfully",
                };
            }
        }
        return {
            status: 500,
            message: "Failed to change UserName",
        };
    } catch (err) {
        console.error(err);
        return {
            status: 500,
            message: "Internal server error",
        };
    }
}

export async function deleteAccount() {
    try {
        const cookie = cookies().get("secret-access-token");
        if (!cookie) {
            throw new Error("User does not exist");
        }
        const userName = decode(cookie.value) as string;
        const deletedSuccesfully = await deleteUser(userName);
        if (deletedSuccesfully) {
            await logOut();
            return redirect("/signup");
        }
    } catch (err) {
        console.error(err);
    }
}

export async function logOut() {
    try {
        cookies().delete("secret-access-token");
    } catch (err) {
        console.error(err);
    }
}

/**
 *
 * returns the user information: {userName: string}
 * if the current secret-access-token is not valid, throws error
 * */
export async function getUserInfo() {
    try {
        const cookie = cookies().get("secret-access-token");
        if (!cookie) {
            throw new Error("User does not exist");
        }
        const userName = decode(cookie.value) as string;
        return {
            userName,
        };
    } catch (err) {
        console.error("Internal server error");
        return null;
    }
}

export async function createSession(userName: string) {
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
    try {
        const privateKey = await generateSecret();
        return { token: sign(userName, privateKey!), key: privateKey! };
    } catch (err) {
        console.error(err);
    }
}

export async function verifyToken(token: string, key: string) {
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
