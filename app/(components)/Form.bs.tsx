"use client";

import { UserData } from "@/types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormikProps } from "formik";
import FormSection from "./FormSection.bs";

interface FormProps {
    children?: JSX.Element | JSX.Element[] | string;
    text?: string;
    formik: FormikProps<UserData>;
}

function Form(props: FormProps): JSX.Element {
    return (
        <form
            className="custom-form bg-zinc-200 rounded p-4 flex flex-col items-center justify-around gap-3"
            noValidate
            method="POST"
            onSubmit={props.formik.handleSubmit}
        >
            <section className="flex items-center justify-center h-20">
                <h1>{props.text}</h1>
            </section>
            <FormSection
                formik={props.formik}
                value="userName"
                label="Username"
            ></FormSection>
            <FormSection
                formik={props.formik}
                value="password"
                label="Password"
            ></FormSection>
            <input
                type="submit"
                value={props.text}
                className="btn btn-primary w-full"
            />
        </form>
    );
}

export default Form;
