"use client";
import AuthForm from "@/components/forms/AuthForms";
import React from "react";
import { SignInSchema } from "../../../lib/validation";
import { signInWithCreadentials } from "@/lib/actions/auth.action";

const SignIn = () => {
    return (
        <AuthForm
            formType={"SIGN_IN"}
            schema={SignInSchema}
            defaultVal={{ email: "", password: "" }}
            onSubmit={signInWithCreadentials}
        />
    );
};

export default SignIn;
