import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const formData = await request.formData();

        // Extract fields from formData
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        const image = formData.get('profileImage');

        // Preferences as JSON string
        let preferences = {};
        const preferencesRaw = formData.get('preferences');
        if (preferencesRaw) {
            try {
                preferences = JSON.parse(preferencesRaw);
            } catch (e) {
                return NextResponse.json({ error: "Invalid preferences format" }, { status: 400 });
            }
        }

        // Update user data (email, password) if provided
        if (email || password) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    ...(email && { email }),
                    ...(password && { password }), // In production, hash the password!
                },
            });
        }

        // Handle profile image upload
        let uploadedImageUrl = undefined;
        if (image && typeof image === "object" && image.name) {
            try {
                const uploadResponse = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "profile_images",
                            public_id: userId,
                            overwrite: true,
                            resource_type: "auto"
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    image.arrayBuffer().then(buffer => {
                        const uint8Array = new Uint8Array(buffer);
                        uploadStream.end(uint8Array);
                    });
                });
                uploadedImageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Profile image upload error: ", uploadError);
                return NextResponse.json({ error: "Failed to upload profile image" }, { status: 500 });
            }
        }

        // Update/create user profile with preferences, username, and profileImage
        await prisma.userProfile.upsert({
            where: { userId },
            update: {
                favoriteStyle: preferences?.favoriteStyle,
                favoriteColor1: preferences?.favoriteColor1,
                favoriteColor2: preferences?.favoriteColor2,
                favoriteBottom: preferences?.favoriteBottom,
                favoriteTop: preferences?.favoriteTop,
                favoriteShoes: preferences?.favoriteShoes,
                favoriteMaterial: preferences?.favoriteMaterial,
                displayName: username,
                ...(uploadedImageUrl && { profileImage: uploadedImageUrl }),
            },
            create: {
                userId,
                favoriteStyle: preferences?.favoriteStyle,
                favoriteColor1: preferences?.favoriteColor1,
                favoriteColor2: preferences?.favoriteColor2,
                favoriteBottom: preferences?.favoriteBottom,
                favoriteTop: preferences?.favoriteTop,
                favoriteShoes: preferences?.favoriteShoes,
                favoriteMaterial: preferences?.favoriteMaterial,
                displayName: username,
                ...(uploadedImageUrl && { profileImage: uploadedImageUrl }),
            },
        });

        return NextResponse.json(
            { message: "Profile updated successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Request error: ", error)
        return NextResponse.json({
            error: "Failed to process request"
        }, { status: 500 })
    }
}