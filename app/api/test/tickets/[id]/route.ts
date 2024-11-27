import tickets from "@/app/database";
import { Tickets } from "lucide-react";
import { NextResponse } from "next/server";

//get by id
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const ticket = tickets.find((ticket) => ticket.id === parseInt(id));
    return NextResponse.json(ticket);
}
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { name, status, type } = await request.json();
    const ticket = tickets.find((ticket) => ticket.id === parseInt(id));
    if (!ticket)
        return NextResponse.json(new Error("Ticket Not Found"), {
            status: 400,
        });
    if (name) ticket.name = name;
    if (status) ticket.status = status;
    if (type) ticket.type = type;

    return NextResponse.json(ticket);
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const ticketIndex = tickets.findIndex(
        (ticket) => ticket.id === parseInt(id)
    );
    if (ticketIndex === -1)
        NextResponse.json(new Error("Ticket not found!"), { status: 404 });
    tickets.splice(ticketIndex, 1);
    return NextResponse.json(tickets);
}
