"use client";
import { useFormik } from "formik";
import Form from "../(components)/Form.bs";
import { userSchema } from "../(schemas)/user.schema";
import { UserData } from "@/types/types";
import { submitLoginForm } from "../(actions)/submitForm";
import { useRouter } from "next/navigation";

function LoginPage(): JSX.Element {
    const router = useRouter();
    const formik = useFormik<UserData>({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: async (formData, { setStatus }) => {
            const isValid = await submitLoginForm(formData);
            if (isValid) {
                router.push("/chat");
            } else {
                setStatus("Username or Password invalid");
            }
        },
    });

    return (
        <main className="w-screen h-screen bg-zinc-800 grid place-items-center">
            <Form text="Login" formik={formik}></Form>
        </main>
    );
}

export default LoginPage;
