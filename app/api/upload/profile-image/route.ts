import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const userId = data.get("userId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image." },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB." },
        { status: 400 }
      );
    }

    // Compress image before sending to gateway
    const compressedFile = await compressImage(file);
    console.log("compressedFile", compressedFile);

    // Create FormData to forward to gateway
    const forwardData = new FormData();
    forwardData.append("file", compressedFile);
    forwardData.append("userId", userId);
    forwardData.append("type", "profile-image");

    // Forward to your GraphQL gateway REST endpoint
    const gatewayUrl = process.env.GATEWAY_URL || "http://localhost:9000";
    const response = await fetch(`${gatewayUrl}/api/profile-image`, {
      method: "POST",
      body: forwardData,
      credentials: "include",
    });
    console.log("gateway response", response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Gateway upload failed");
    }

    const result = await response.json();

    // Log successful upload
    console.log(
      `Profile image forwarded to gateway: ${result.fileName} for user: ${userId}`
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error forwarding file to gateway:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}

// Function to compress image using Sharp
async function compressImage(file: File): Promise<File> {
  try {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compress and resize image for cover (800x800px)
    const processedBuffer = await sharp(buffer)
      .resize(800, 800, {
        fit: "cover",
        position: "center",
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .toBuffer();

    // Create new File from processed buffer
    const compressedFile = new File(
      [new Uint8Array(processedBuffer)],
      `compressed-${file.name.split(".")[0]}.jpg`,
      {
        type: "image/jpeg",
        lastModified: Date.now(),
      }
    );

    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    // Return original file if compression fails
    return file;
  }
}
