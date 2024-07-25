"use client";

import { useFormik } from "formik";
import { nameSchema, passwordSchema } from "../(schemas)/user.schema";
import { RefObject } from "react";
import { changePassword, changeUserName } from "../(actions)/auth.actions";

interface FCNProps {
    fref: RefObject<HTMLFormElement>;
}

export function FormChangeName(p: FCNProps) {
    const formik = useFormik({
        initialValues: {
            userName: "",
        },
        validateOnChange: true,
        validationSchema: nameSchema,
        onSubmit: async (values, { setStatus, setFieldError }) => {
            try {
                const response = await changeUserName(values.userName);
                if (response.status > 299) {
                    setFieldError("userName", response.message);
                } else {
                    setStatus(response.message);
                }
            } catch (err) {
                console.error(err);
                setFieldError("userName", (err as Error).message);
            }
        },
    });

    return (
        <form
            ref={p.fref}
            onSubmit={formik.handleSubmit}
            className={`w-full grid place-items-center hide-form text-black`}
        >
            <input
                className="w-full text-center bg-white border h-10 "
                type="text"
                name="userName"
                id="userName"
                placeholder="New UserName"
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                autoFocus={true}
            />
            <input
                className="w-full bg-blue-500 text-white h-10 rounded-b-sm hover:bg-blue-600 cursor-pointer"
                type="submit"
                name="submit"
                id="submit-2"
                value="Submit"
            />
            <p
                className={`h-10 w-full bg-none grid place-items-center ${formik.status ? "text-blue-600" : "text-red-400"}`}
            >
                {formik.touched.userName && formik.errors.userName
                    ? formik.errors.userName
                    : formik.status}
            </p>
        </form>
    );
}

export function FormChangePassword(p: FCNProps) {
    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validateOnChange: true,
        validationSchema: passwordSchema,
        onSubmit: async (values, { setStatus, setFieldError, resetForm }) => {
            try {
                const response = await changePassword(values.password);
                resetForm();
                if (response.status > 299) {
                    setFieldError("password", response.message);
                } else {
                    setStatus(response.message);
                }
            } catch (err) {
                console.error(err);
                setFieldError("userName", (err as Error).message);
            }
        },
    });

    return (
        <form
            ref={p.fref}
            onSubmit={formik.handleSubmit}
            className={`w-full grid place-items-center hide-form text-black`}
        >
            <input
                className="w-full text-center bg-white border h-10 "
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                autoFocus={true}
            />
            <input
                className="w-full bg-blue-500 text-white h-10 rounded-b-sm hover:bg-blue-600 cursor-pointer"
                type="submit"
                name="submit"
                id="submit"
                value="Submit"
            />
            <p
                className={`h-10 text-center text-sm px-2 w-full bg-none grid place-items-center ${formik.status ? "text-blue-600" : "text-red-400"}`}
            >
                {formik.errors.password
                    ? formik.errors.password
                    : formik.status}
            </p>
        </form>
    );
}
