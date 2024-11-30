import Account from "@/database/accounts.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    if (!id) throw new NotFoundError("Account");
    try {
        await dbConnect();
        const existingAcount = await Account.findById(id);
        if (!existingAcount) throw new NotFoundError("Account");
        return NextResponse.json(
            { succes: true, data: existingAcount },
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
    if (!id) throw new NotFoundError("Account");
    try {
        await dbConnect();
        const existingAccount = await Account.findByIdAndDelete(id);
        if (!existingAccount) throw new NotFoundError("Account");
        return NextResponse.json(
            { success: true, data: existingAccount },
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
    if (!id) throw new NotFoundError("Account");
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = AccountSchema.partial().safeParse(body);
        if (!validatedData.success)
            throw new ValidationError(
                validatedData.error.flatten().fieldErrors
            );
        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            validatedData,
            { new: true }
        );
        return NextResponse.json(
            { success: true, data: updatedAccount },
            { status: 200 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}
