import tickets from "@/app/database";
import { NextResponse } from "next/server";
import test from "node:test";

export async function GET() {
    return NextResponse.json(tickets);
}

export async function POST(request: Request) {
    const newTicket = await request.json(); // Parse the incoming request body
    const ticket = {
        id: tickets.length + 1, // Assign a new unique ID
        name: newTicket.name,
        status: newTicket.status,
        type: newTicket.type,
    };

    tickets.push(ticket); // Push the valid ticket into the array

    return NextResponse.json(ticket); // Respond with the added ticket
}
