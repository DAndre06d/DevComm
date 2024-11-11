"use client";
import React from "react";
import AuthForm from "@/components/forms/AuthForms";
import { SignUpSchema } from "@/lib/validation";
const SignUp = () => {
    return (
        <AuthForm
            formType={"SIGN_UP"}
            schema={SignUpSchema}
            defaultVal={{ email: "", password: "", name: "", username: "" }}
            onSubmit={(data) => Promise.resolve({ success: true, data })}
        />
    );
};

export default SignUp;
