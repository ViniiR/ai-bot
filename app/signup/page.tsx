"use client";

import { UserData } from "@/types/types";
import Form from "../(components)/Form.bs";
import { useFormik } from "formik";
import { userSchema } from "../(schemas)/user.schema";
import submitSignUpForm from "../(actions)/submitForm";
import { createSession } from "../(actions)/auth.actions";
import { redirect } from "next/navigation";

function SignupPage(): JSX.Element {
    const formik = useFormik<UserData>({
        initialValues: {
            userName: "",
            password: "",
        },
        validateOnChange: true,
        validationSchema: userSchema,
        onSubmit: async (formData, { setStatus }) => {
            const res: { message: string; status: number } = JSON.parse(
                await submitSignUpForm(formData),
            );
            try {
                res.message = JSON.parse(res.message);
            } catch (err) {
                console.error(err);
            }
            if (res.status > 199 && res.status < 300) {
                setStatus(res.message);
                const isSession = await createSession(formData.userName);
                if (isSession) {
                    redirect("/chat");
                }
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
