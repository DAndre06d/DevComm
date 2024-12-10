"use server";
import { ActionResponse, ErrorReponse } from "@/types/global";
import action from "../handlers/action";
import { SignInSchema, SignUpSchema } from "../validation";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/accounts.model";
import { signIn } from "@/auth";
import { NotFoundError } from "../http-errors";

export async function signUpWithCreadentials(
    params: AuthCredentials
): Promise<ActionResponse> {
    const validationResult = await action({ params, schema: SignUpSchema });
    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorReponse;
    }
    const { username, name, email, password } = validationResult.params!;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            throw new Error("Email already exists.");
        }
        const existingUsername = await User.findOne({ username }).session(
            session
        );
        if (existingUsername) {
            throw new Error("Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const [newUser] = await User.create([{ username, name, email }], {
            session,
        });
        await Account.create(
            [
                {
                    userId: newUser._id,
                    name,
                    provider: "credentials",
                    providerAccountId: email,
                    password: hashedPassword,
                },
            ],
            { session }
        );
        await session.commitTransaction();
        await signIn("credentials", { email, password, redirect: false });
        return { success: true };
    } catch (e) {
        await session.abortTransaction();
        return handleError(e) as ErrorReponse;
    } finally {
        await session.endSession();
    }
}
export async function signInWithCreadentials(
    params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
    const validationResult = await action({ params, schema: SignInSchema });
    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorReponse;
    }
    const { email, password } = validationResult.params!;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new NotFoundError("User");
        }
        const existingAccount = await Account.findOne({
            provider: "credentials",
            providerAccountId: email,
        });
        if (!existingAccount) {
            throw new NotFoundError("Account");
        }
        const isPasswordMatch = await bcrypt.compare(
            password,
            existingAccount.password
        );
        if (!isPasswordMatch) throw new Error("Password does not match");
        await signIn("credentials", { email, password, redirect: false });
        return { success: true };
    } catch (e) {
        return handleError(e) as ErrorReponse;
    }
}
