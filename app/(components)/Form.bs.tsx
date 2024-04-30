import { UserData } from "@/types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormikProps } from "formik";
import FormSection from "./FormSection.bs";
import Link from "next/link";
import "./form-style.css";
import LoginBackground from "@assets/mountainforest.webp";
import SignUpBackground from "@assets/waterfall.webp";

interface FormProps {
    children?: JSX.Element | JSX.Element[] | string;
    text?: string;
    formik: FormikProps<UserData>;
}

function Form(props: FormProps): JSX.Element {
    const isLogin = props.text?.toLowerCase() === "login";

    return (
        <form
            className="custom-form bg-zinc-200 w-full media-form rounded p-4 flex flex-col items-center justify-around gap-3 shadow-black shadow-sm relative overflow-hidden"
            noValidate
            method="POST"
            onSubmit={props.formik.handleSubmit}
        >
            {isLogin ? (
                <div className="absolute rotate-45 right-neg-top font-bold w-56 h-6 text-center bg-green-400">
                    Glad you&apos;re back!
                </div>
            ) : (
                <div className="hidden"></div>
            )}
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
            <p className="w-full text-indigo-800 flex h-5 items-center justify-center">
                {props.formik.status}
            </p>
            <input
                type="submit"
                value={props.text}
                className="btn btn-primary w-full shadow-black shadow-sm"
            />
            <Link
                className="no-underline text-sm w-full h-10 flex items-center justify-center text-blue-600 hover:underline decoration-blue-500 "
                href={isLogin ? "/signup" : "/login"}
            >
                {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Log In"}
            </Link>
            <div
                id="background-image"
                className="hidden bg-zinc-200"
                style={{
                    backgroundImage: `url(${isLogin ? LoginBackground.src : SignUpBackground.src})`,
                }}
            ></div>
        </form>
    );
}

export default Form;
