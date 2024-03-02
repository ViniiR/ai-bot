"use client";

import { UserData } from "@/types/types";
import Form from "../(components)/Form.bs";
import { useFormik } from "formik";
import { userSchema } from "../(schemas)/user.schema";

interface SignupPageProps {
    children?: JSX.Element | JSX.Element[] | string;
}

async function fetchFormData(data: UserData) {
    //wrong //FIXME:
    const res = await fetch(`signup/api`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return res;
}

function SignupPage(props: SignupPageProps): JSX.Element {
    const formik = useFormik<UserData>({
        initialValues: {
            userName: "",
            password: "",
        },
        validateOnChange: true,
        validationSchema: userSchema,
        onSubmit: async (formData, { setStatus, setErrors }) => {
            const res = await fetchFormData(formData);
            console.log(res);
            setErrors({ userName: "", password: "" });
            setStatus({ userName: "", password: "" });
        },
    });

    return (
        <main className="h-screen w-screen grid place-items-center bg-zinc-800">
            <Form text="Signup" formik={formik}></Form>
        </main>
    );
}

export default SignupPage;
