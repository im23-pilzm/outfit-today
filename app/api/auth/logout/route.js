import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: "Logges out successfully" },
            { status: 200 }
        );

        response.cookies.delete("token")

        return response
    } catch (error) {
        console.error("Logout error", error)
        return NextResponse.json(
            { error: "Error during logout" },
            { status: 500 }
        );
    }
}