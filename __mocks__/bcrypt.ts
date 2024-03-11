interface Bcrypt {
    hash: CallableFunction;
    genSalt: CallableFunction;
    compare: CallableFunction;
}

const bcrypt = jest.createMockFromModule<Bcrypt>("bcrypt");

bcrypt.hash = jest.fn((str: string, salt: number) => {
    return `${salt}.${str}`;
});

bcrypt.genSalt = jest.fn((number: number) => {
    return "mock-salt" + number.toString();
});

bcrypt.compare = jest.fn((str: string, hashedStr: string) => {
    if (hashedStr.includes(str)) {
        return true;
    }
    return false;
});

export default bcrypt;
