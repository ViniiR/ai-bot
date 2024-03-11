import bcrypt from "bcrypt";

export async function getHashedString(string: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(string, salt);
        return hash;
    } catch (err) {
        throw err;
    }
}

export async function comparePasswords(
    password: string,
    hashedPassword: string,
) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}
