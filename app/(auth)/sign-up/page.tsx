"use client";
import React from "react";
import AuthForm from "@/components/forms/AuthForms";
import { SignUpSchema } from "@/lib/validation";
import { signUpWithCreadentials } from "@/lib/actions/auth.action";
const SignUp = () => {
    return (
        <AuthForm
            formType={"SIGN_UP"}
            schema={SignUpSchema}
            defaultVal={{ email: "", password: "", name: "", username: "" }}
            onSubmit={signUpWithCreadentials}
        />
    );
};

export default SignUp;
