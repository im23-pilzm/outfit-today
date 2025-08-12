import { NextResponse } from "next/server";
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET

export async function middleware(request) {
    const publicPaths = [
        "/login",
        "/register",
        "/",
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/logout",
        "/_next",
        "/favicon.ico",
        "/hanger.png"
    ];

    if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next();
    }

    if (publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("user", JSON.stringify(payload));

        return NextResponse.next({
            request: {
                headers: requestHeaders
            },
        });
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ]
};