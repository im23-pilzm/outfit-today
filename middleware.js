import { withAuth } from "next-auth/middleware";

// Replace the existing middleware with NextAuth's middleware
export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token
    }
});

export const config = {
    matcher: [
        '/wardrobe',
        '/api/wardrobe/:path*',
        // Add any other protected routes here
        '/((?!api/auth|login|register|_next/static|_next/image|favicon.ico|hanger.png).*)'
    ]
};