import Account from "@/database/accounts.model";
import handleError from "@/lib/handlers/error";
import {
    ForbiddenError,
    NotFoundError,
    ValidationError,
} from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const accounts = await Account.find();
        return NextResponse.json(
            { success: true, data: accounts },
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
        const validatedData = AccountSchema.parse(body);
        const existingAccount = Account.findOne({
            provider: validatedData.provider,
            providerAccountId: validatedData.providerAccountId,
        });
        if (!existingAccount)
            throw new ForbiddenError(
                "An account with the same provider already exist"
            );
        const newAccount = await Account.create(validatedData);
        return NextResponse.json(
            { success: true, data: newAccount },
            { status: 201 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}
