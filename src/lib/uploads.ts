/** Shared upload configuration. Safe to import on the client. */
export const uploadsEnabled = process.env.NEXT_PUBLIC_UPLOADS_ENABLED === 'true';

export const UPLOAD_ACCEPT = '.pdf,.xlsx,.xls,.docx,.zip';

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function hasAllowedExtension(filename: string, allowed: string[]): boolean {
  const lower = filename.toLowerCase();
  return allowed.some((ext) => lower.endsWith(ext));
}
