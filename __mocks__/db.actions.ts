export async function createUser() {
    try {
        return true;
    } catch (err) {
        return false;
    }
}

export async function deleteUser() {
    try {
        //
    } catch (err) {
        console.error(err);
    }
}

export async function storeSecretKey(key: string, userName: string) {
    // do nothing, i'm a mock
}

export async function findAndRetrieveKey(userName: string) {
    return "mockKey";
}

export async function getPasswordFrom(userName: string) {
    return "mockPassword";
}
