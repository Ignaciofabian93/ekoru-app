import { NextRequest, NextResponse } from "next/server";

// Configure body size limit for this route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const userId = data.get("userId") as string;

    if (!file) {
      return NextResponse.json({ error: "Ningún archivo recibido." }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Se requiere el ID de usuario." }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen." }, { status: 400 });
    }

    // Validate file size (4MB limit - client already compressed it)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El tamaño del archivo debe ser menor a 4MB después de la compresión." },
        { status: 400 }
      );
    }

    // Create FormData to forward to gateway (no need to compress again)
    const forwardData = new FormData();
    forwardData.append("file", file);
    forwardData.append("userId", userId);
    forwardData.append("type", "profile-image");

    // Forward to your GraphQL gateway REST endpoint
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:9000";
    const response = await fetch(`${gatewayUrl}/api/profile-image`, {
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
    console.error("Error forwarding file to gateway:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to upload file: ${errorMessage}` }, { status: 500 });
  }
}
