import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { ALLOWED_UPLOAD_TYPES, MAX_FILE_BYTES } from '@/lib/schemas';
import { rateLimit, clientKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Issues short-lived upload tokens so the browser can send files straight to
 * Vercel Blob. This is deliberate: routing files through the serverless
 * function would cap uploads at roughly 4.5 MB, which is smaller than most
 * plan sets. The BLOB_READ_WRITE_TOKEN never reaches the client.
 */
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'File uploads are not configured. Send documents by email instead.' },
      { status: 503 },
    );
  }

  const limit = rateLimit(clientKey(request, 'upload'), 40);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many uploads. Try again shortly.' }, { status: 429 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: Object.keys(ALLOWED_UPLOAD_TYPES),
        maximumSizeInBytes: MAX_FILE_BYTES,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ source: 'submit-project' }),
      }),
      onUploadCompleted: async ({ blob }) => {
        console.info('[upload] stored', blob.pathname);
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
