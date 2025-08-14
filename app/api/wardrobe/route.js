import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../../../lib/prisma';
import { CldOgImage } from 'next-cloudinary';
import { error } from 'console';
import { resolve } from 'path';
import { rejects } from 'assert';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(request) {
    try {
        const receivedFormData = await request.formData();

        console.log('Received form data:', Object.fromEntries(receivedFormData));

        const image = receivedFormData.get("image");
        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const name = receivedFormData.get('name');
        const color = receivedFormData.get('color');
        const size = receivedFormData.get('size');
        const category = receivedFormData.get('category');

        const missing = [];

        if (!name) missing.push('name');
        if (!color) missing.push('color');
        if (!size) missing.push('size');
        if (!category) missing.push('category');
        if (!image) missing.push('image');

        try {
            const uploadResponse = await new Promise((resolve, rejects) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "wardrobe",
                        resource_type: "auto"
                    },
                    (error, result) => {
                        if (error) rejects(error);
                        else resolve(result)
                    }
                )

                image.arrayBuffer().then(buffer => {
                    const uint8Array = new Uint8Array(buffer);
                    uploadStream.end(uint8Array);
                });
            });

            return NextResponse.json({
                message: "Upload successful",
                imageUrl: uploadResponse.secure_url,
                data: {
                    name: receivedFormData.get('name'),
                    brand: receivedFormData.get('brand'),
                    color: receivedFormData.get('color'),
                    size: receivedFormData.get('size'),
                    category: receivedFormData.get('category')
                }
            })

        } catch (uploadError) {
            console.error("Upload error: ", uploadError);
            return NextResponse.json({
                error: "Failed to upload image"
            }, { status: 500 })
        }
    } catch (error) {
        console.error("Request error: ", error)
        return NextResponse.json({
            error: "Failed to process request"
        }, { status: 500 })
    }
}