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
        onSubmit: async (values, { setStatus, setFieldError, resetForm }) => {
            try {
                const response = await changeUserName(values.userName);
                setFieldError("userName", response.message);
                if (response.status > 299) {
                    setFieldError("userName", response.message);
                } else {
                    setStatus(response.message);
                }
                resetForm();
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
            className={`w-full grid place-items-center hide-form`}
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
            />
            <p
                className={`h-10 w-full bg-white border-t-black border-t grid place-items-center ${formik.status ? "text-blue-600" : "text-red-500"}`}
            >
                {formik.touched.userName && formik.errors.userName
                    ? formik.errors.userName
                    : formik.status}
            </p>
            <input
                className="w-full bg-green-600 text-white h-10 rounded-b hover:bg-blue-700 cursor-pointer"
                type="submit"
                name="submit"
                id="submit"
                value="Submit"
            />
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
                setFieldError("password", response.message);
                if (response.status > 299) {
                    setFieldError("password", response.message);
                } else {
                    setStatus(response.message);
                }
                resetForm();
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
            className={`w-full grid place-items-center hide-form`}
        >
            <input
                className="w-full text-center bg-white border h-10 "
                type="text"
                name="password"
                id="password"
                placeholder="New Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            <p
                className={`h-10 w-full bg-white border-t border-t-black grid place-items-center ${formik.status ? "text-blue-600" : "text-red-500"}`}
            >
                {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : formik.status}
            </p>
            <input
                className="w-full bg-green-600 text-white h-10 rounded-b hover:bg-blue-700 cursor-pointer"
                type="submit"
                name="submit"
                id="submit"
                value="Submit"
            />
        </form>
    );
}
