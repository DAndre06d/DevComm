import Account from "@/database/accounts.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { providerAccountId } = await request.json();
    try {
        const validatedData = AccountSchema.partial().safeParse({
            providerAccountId,
        });

        if (!validatedData.success)
            throw new ValidationError(
                validatedData.error.flatten().fieldErrors
            );
        const account = Account.findOne({ providerAccountId });
        if (!account) throw new NotFoundError("Account");
        return NextResponse.json(
            { success: true, data: account },
            { status: 200 }
        );
    } catch (e) {
        return handleError(e, "api") as APIErrorResponse;
    }
}
