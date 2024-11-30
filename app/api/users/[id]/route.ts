import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    if (!id) throw new NotFoundError("User");
    try {
        await dbConnect();
        const existingUser = await User.findById(id);
        if (!existingUser) throw new NotFoundError("User");
        return NextResponse.json(
            { succes: true, data: existingUser },
            { status: 200 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const existingUser = await User.findByIdAndDelete(id);
        if (!existingUser) throw new NotFoundError("User");
        return NextResponse.json(
            { success: true, data: existingUser },
            { status: 204 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}

//PUT

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = UserSchema.partial().parse(body);
        const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
            new: true,
        });
        if (!updatedUser) throw new NotFoundError("User");
        return NextResponse.json(
            { success: true, data: updatedUser },
            { status: 200 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}
