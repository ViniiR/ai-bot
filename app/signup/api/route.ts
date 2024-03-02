import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
    console.log(req.body);
    NextResponse.json(
        {
            message: "teste",
        },
        {
            status: 200,
        },
    );
}
