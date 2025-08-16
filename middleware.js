import { withAuth } from "next-auth/middleware";

// Replace the existing middleware with NextAuth's middleware
export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token
    }
});

export const config = {
    matcher: [
        '/wardrobe/:path*',
        '/api/wardrobe/:path*',
        '/profile/:path*',
        // Exclude home, auth routes, and static assets
        '/((?!|api/auth|login|register|_next/static|_next/image|favicon.ico|hanger.png).*)'
    ]
};