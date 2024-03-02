import * as yup from "yup";

export const userSchema = yup.object().shape({
    userName: yup
        .string()
        .min(2, "Username too short")
        .trim()
        .required("Username is a required field"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .trim()
        .required("Password is a required field"),
});
