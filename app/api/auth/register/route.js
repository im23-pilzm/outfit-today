import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export async function POST(request) {
    try {
        console.log('Attempting to register user...');
        const body = await request.json();
        console.log('Request body:', body);
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        console.log('Checking if user exists...');
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        console.error('Stack trace:', error.stack);
        return NextResponse.json(
            { 
                error: "Error creating user",
                details: error.message,
                stack: error.stack
            },
            { status: 500 }
        );
    }
}
