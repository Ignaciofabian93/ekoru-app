import { NextRequest, NextResponse } from "next/server";

// Configure body size limit for this route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files = data.getAll("files") as File[];
    const userId = data.get("userId") as string;
    const productId = data.get("productId") as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    if (files.length > 3) {
      return NextResponse.json({ error: "Maximum 3 images allowed." }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    // Validate each file
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "All files must be images." }, { status: 400 });
      }

      // Validate file size (4MB limit per file - client already compressed)
      if (file.size > 4 * 1024 * 1024) {
        return NextResponse.json({ error: "Each file must be less than 4MB after compression." }, { status: 400 });
      }
    }

    // Create FormData to forward to gateway
    const forwardData = new FormData();
    files.forEach((file) => {
      forwardData.append("files", file);
    });
    forwardData.append("userId", userId);
    if (productId) {
      forwardData.append("productId", productId);
    }
    forwardData.append("type", "product-images");

    // Forward to your GraphQL gateway REST endpoint
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:9000";
    const response = await fetch(`${gatewayUrl}/api/product-images`, {
      method: "POST",
      body: forwardData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `Gateway returned ${response.status}`;
      console.error("Gateway upload failed:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error forwarding files to gateway:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to upload files: ${errorMessage}` }, { status: 500 });
  }
}
