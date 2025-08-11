import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import prisma from '../../../../lib/prisma';
import { error } from 'console';

export async function POST(request) {
    try {
        const body = request.body;
        const { email, password } = body


        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        const response = NextResponse.json(
            {
                message: "Logged in successfully",
                user: {
                    id: user.id,
                    email: user.email
                }
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60
        })

        return response

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Error during login" },
            { status: 500 }
        );
    }
}