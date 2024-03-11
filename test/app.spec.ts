import {
    createJWT,
    verifyToken,
    verifyUserCredentials,
} from "@/app/(actions)/auth.actions";
import submitSignUpForm from "@/app/(actions)/submitForm";
import { UserData } from "@/types/types";

jest.mock("../app/(actions)/auth.actions", () => ({
    ...jest.requireActual("../app/(actions)/auth.actions"),
    verifyUserCredentials: jest.fn((formData: UserData) => {
        return formData.password.includes(formData.userName);
    }),
}));

describe("form submission", () => {
    it("should create a user on database", () => {
        submitSignUpForm({ userName: "mock", password: "passwordMock" }).then(
            (result: string) => {
                const parsed = JSON.parse(result);
                expect(parsed).toHaveProperty("status");
                expect(parsed.status).toBeGreaterThanOrEqual(200);
                expect(parsed.status).toBeLessThanOrEqual(299);
            },
        );
    });

    it.todo("should remove a user from database");
});

describe("user authentication", () => {
    it("should create a jwt token", () => {
        const string = "abcde";
        createJWT(string).then(
            (data: { token: string; key: string } | undefined) => {
                expect(data).toHaveProperty("token");
                expect(data).toHaveProperty("key");
                expect(data?.token).toMatch(/^.*[.].*[.].*$/);
            },
        );
    });

    it("should verify a jwt token", () => {
        createJWT("mock").then(
            async (data: { token: string; key: string } | undefined) => {
                const isValid = await verifyToken(data!.token, data!.key);
                expect(isValid).toBe(true);
            },
        );
    });

    it("should be a false jwt", () => {
        verifyToken("invalid.jwt.token", "invalidKeyString").then((data) => {
            expect(data).toBe(false);
        });
    });

    it("should verify if the user has valid credentials", async () => {
        const formData: UserData = {
            userName: "mock",
            password: "mockPassword",
        };
        const res = await verifyUserCredentials(formData);
        expect(res).toBe(true);
    });

    it("it should return invalid credentials", async () => {
        const formData: UserData = {
            userName: "mock",
            password: "invalidPassword",
        };
        const res = await verifyUserCredentials(formData);
        expect(res).toBe(false);
    });
});
