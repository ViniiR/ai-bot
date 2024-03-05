"use client";

import { UserData } from "@/types/types";
import Form from "../(components)/Form.bs";
import { useFormik } from "formik";
import { userSchema } from "../(schemas)/user.schema";
import submitForm from "../(actions)/submitForm";

interface SignupPageProps {
    children?: JSX.Element | JSX.Element[] | string;
}

function SignupPage(props: SignupPageProps): JSX.Element {
    const formik = useFormik<UserData>({
        initialValues: {
            userName: "",
            password: "",
        },
        validateOnChange: true,
        validationSchema: userSchema,
        onSubmit: async (formData, { setStatus }) => {
            const res: { message: string; status: number } = JSON.parse(
                await submitForm(formData),
            );
            if (res.status > 199 && res.status < 300) {
                setStatus(res.message);
            } else {
                setStatus(res.message);
            }
        },
    });

    return (
        <main className="h-screen w-screen grid place-items-center bg-zinc-800">
            <Form text="Signup" formik={formik}></Form>
        </main>
    );
}

export default SignupPage;
