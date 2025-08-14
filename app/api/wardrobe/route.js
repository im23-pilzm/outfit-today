import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../../../lib/prisma';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(request) {
    const formData = await request.formData();

    const name = formData.get("name");
    const brand = formData.get("brand");
    const color = formData.get("color");
    const size = formData.get("size");
    const category = formData.get("category");
    const image = formData.get("image");

    console.log("Received form data:", {
        name,
        brand,
        color,
        size,
        category,
        image: image ? "Image file present" : "No Image"
    });

}