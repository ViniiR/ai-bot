"use client";
import { useFormik } from "formik";
import Form from "../(components)/Form.bs";
import { userSchema } from "../(schemas)/user.schema";
import { UserData } from "@/types/types";

interface LoginPageProps {
    children?: JSX.Element | JSX.Element[] | string;
}

function LoginPage(props: LoginPageProps): JSX.Element {
    const formik = useFormik<UserData>({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: async (formData, { setStatus, setErrors }) => {
            console.log(formData);
        },
    });

    return (
        <main className="w-screen h-screen bg-zinc-800 grid place-content-center">
            <Form text="Login" formik={formik}></Form>
        </main>
    );
}

export default LoginPage;
