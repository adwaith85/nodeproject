import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import path from "path";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Validate ENV variables
if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY || !process.env.AWS_BUCKET_NAME) {
    throw new Error("Missing AWS environment variables");
}

// S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /\.(jpg|jpeg|png|gif|webp)$/i;

    if (!allowedTypes.test(file.originalname)) {
        return cb(new Error("Only image files are allowed"), false);
    }

    cb(null, true);
};

// Use memoryStorage so we can manually upload to S3 (avoids multer-s3 ACL issues)
export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

// Helper to upload a file buffer to S3 and return the public URL
export async function uploadToS3(file) {
    console.log(`Uploading file content to S3 bucket: ${process.env.AWS_BUCKET_NAME}, Key matching: uploads/${file.fieldname}-...`);
    const uniqueName = Date.now() + "-" + crypto.randomBytes(6).toString("hex");
    const key = `uploads/${file.fieldname}-${uniqueName}${path.extname(file.originalname)}`;

    await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        // No ACL needed here as bucket policy permits public read
    }));

    // Construct and return the direct public S3 URL
    const location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return location;
}

// No longer needs signing, just return the stored URL/key
export async function getSignedImageUrl(key) {
    return key; // Returns direct URL stored in DB
}

