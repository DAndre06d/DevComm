"use client";
import AuthForm from "@/components/forms/AuthForms";
import React from "react";
import { SignInSchema } from "../../../lib/validation";

const SignIn = () => {
    return (
        <AuthForm
            formType={"SIGN_IN"}
            schema={SignInSchema}
            defaultVal={{ email: "", password: "" }}
            onSubmit={(data) => Promise.resolve({ success: true, data })}
        />
    );
};

export default SignIn;
