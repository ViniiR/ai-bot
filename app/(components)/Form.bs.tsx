"use client";

import { UserData } from "@/types/types";
import HoverText from "./HoverText";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormikProps } from "formik";
import FormSection from "./FormSection.bs";
import Link from "next/link";
import "./form-style.css";

interface FormProps {
    children?: JSX.Element | JSX.Element[] | string;
    text?: string;
    formik: FormikProps<UserData>;
}

function Form(props: FormProps): JSX.Element {
    return (
        <form
            className="custom-form bg-zinc-200 w-full max-w-72 phone-media-form rounded p-4 flex flex-col items-center justify-around gap-3"
            noValidate
            method="POST"
            onSubmit={props.formik.handleSubmit}
        >
            <section className="flex items-center justify-center h-20">
                <h1 className="font-bold">{props.text}</h1>
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
            <p className="w-full text-indigo-900 flex h-5 items-center">
                {props.formik.status}
            </p>
            <input
                type="submit"
                value={props.text}
                className="btn btn-primary w-full"
            />
            <Link
                className="no-underline text-sm w-full h-10 flex items-center justify-center text-blue-600 hover:underline decoration-blue-500 "
                href={
                    props.text?.toLowerCase() === "login" ? "/signup" : "/login"
                }
            >
                {props.text?.toLowerCase() === "login"
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Log In"}
            </Link>
        </form>
    );
}

export default Form;
