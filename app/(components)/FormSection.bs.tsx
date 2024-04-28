"use client";

import { UserData } from "@/types/types";
import { FormikProps } from "formik";
import { ChangeEvent, MouseEvent, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import UserIcon from "../(assets)/bxs-user.svg";
import HoverText from "./HoverText";
import OpenPassword from "../(assets)/eye-crossed_3917021.svg";
import ClosedPassword from "../(assets)/eye_3917052.svg";
import Image from "next/image";
import "./form-style.css";

interface FormSectionProps {
    children?: JSX.Element | JSX.Element[] | string;
    /**
     *
     * label is the displayed name to the user
     */
    label: string;
    /**
     *
     * value must be the value of the input
     * e.g. FormData.userName userName is the value
     */
    value: string;
    formik: FormikProps<UserData>;
}

function FormSection(props: FormSectionProps): JSX.Element {
    const [isLocked, setIsLocked] = useState(true);
    const typeOfInput =
        props.label.toLowerCase() === "username"
            ? props.formik.errors.userName
            : props.formik.errors.password;
    function handleChange(e: ChangeEvent) {
        props.formik.handleChange(e);
        props.formik.setStatus("");
    }

    function getPasswordIcon(): StaticImport {
        if (isLocked) {
            return ClosedPassword;
        }
        return OpenPassword;
    }

    function changeIcon(_e: MouseEvent) {
        if (props.value === "userName") return;
        setIsLocked(!isLocked);
        (_e.target as HTMLImageElement).src =
            getPasswordIcon() as unknown as string;
    }

    return (
        <section className="flex items-center gap-1 flex-col w-full">
            <section className="h-full items-center relative w-full flex gap-1 border-b-2 border-b-black ">
                <input
                    className="w-full p-2 bg-zinc-200 rounded-tl-sm "
                    type={
                        props.value === "password" && isLocked
                            ? "password"
                            : "text"
                    }
                    placeholder={
                        props.value === "password" ? "Password" : "UserName"
                    }
                    name={props.value}
                    onChange={handleChange}
                    id={props.value}
                />
                <Image
                    className="cursor-pointer text-hover-sibling"
                    onClick={changeIcon}
                    src={
                        props.value === "userName"
                            ? UserIcon
                            : getPasswordIcon()
                    }
                    alt="Icon representing the current field's purpose"
                ></Image>
                <HoverText
                    content={
                        props.value === "userName"
                            ? "Hi!"
                            : isLocked
                              ? "Click to Show"
                              : "Click to Hide"
                    }
                    className="text-hover bg-zinc-300 h-6 absolute bottom-6 right-0 "
                ></HoverText>
            </section>
            <p className="text-red-600 flex h-10 justify-start w-full items-center">
                {typeOfInput?.toString()}
            </p>
        </section>
    );
}

export default FormSection;
