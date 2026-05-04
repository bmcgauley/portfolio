import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Issues short-lived upload tokens for client-side direct uploads to
 * Vercel Blob. Bypasses the 1 MB Server Action body limit and the
 * 4.5 MB serverless function body limit — files go from browser
 * straight to Blob storage.
 *
 * Auth-gated: only admins can request tokens. The token itself is also
 * narrowly scoped to a single pathname + content type.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await auth();
        const role = (session?.user as { role?: string } | undefined)?.role;
        if (role !== "admin") {
          throw new Error("Not authorized");
        }
        return {
          allowedContentTypes: [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
          ],
          // Limit: 200 MB per file. Plenty for a 500-page thesis;
          // adjust upward if a file ever needs to exceed this.
          maximumSizeInBytes: 200 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // Reserved for future post-upload processing (e.g. PDF metadata
        // extraction, thumbnail generation). No-op for now.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
