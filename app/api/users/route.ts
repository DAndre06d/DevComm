import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import { UserSchema } from "@/lib/validation";
import { ValidationError } from "@/lib/http-errors";

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find();
        return NextResponse.json(
            { success: true, data: users },
            { status: 200 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const validatedData = UserSchema.safeParse(body);
        if (!validatedData.success) {
            throw new ValidationError(
                validatedData.error.flatten().fieldErrors
            );
        }
        const { email, username } = validatedData.data;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) throw new Error("User already Exists.");
        const existingUsername = await User.findOne({ username });
        if (existingUsername) throw new Error("Username already Exists.");

        const newUser = await User.create(validatedData.data);
        return NextResponse.json(
            { succes: true, data: newUser },
            { status: 201 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}
