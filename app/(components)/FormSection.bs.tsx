"use client";

import { UserData } from "@/types/types";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";

interface FormSectionProps {
    children?: JSX.Element | JSX.Element[] | string;
    /**
     * label is the displayed name to the user
     */
    label: string;
    /**
     * value must be the value of the input
     * e.g. FormData.userName userName is the value
     */
    value: string;
    formik: FormikProps<UserData>;
}

function FormSection(props: FormSectionProps): JSX.Element {
    const typeOfInput =
        props.label.toLowerCase() === "username"
            ? props.formik.errors.userName
            : props.formik.errors.password;
    function handleChange(e: ChangeEvent) {
        props.formik.handleChange(e);
        props.formik.setStatus("");
    }
    return (
        <section className="flex items-center gap-1 flex-col">
            <section className="h-full w-full flex gap-1 items-center">
                <label htmlFor={props.value}>{props.label}:</label>
                <input
                    className="form-control border"
                    type="text"
                    name={props.value}
                    onChange={handleChange}
                    id={props.value}
                />
            </section>
            <p className="text-red-600 flex h-10 justify-start w-full items-center">
                {typeOfInput?.toString()}
            </p>
        </section>
    );
}

export default FormSection;
