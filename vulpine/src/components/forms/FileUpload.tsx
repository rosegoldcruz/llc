'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { MAX_FILE_BYTES, MAX_FILES, ALLOWED_UPLOAD_EXTENSIONS } from '@/lib/schemas';
import { UPLOAD_ACCEPT, formatBytes, hasAllowedExtension, uploadsEnabled } from '@/lib/uploads';

export type UploadedFile = { name: string; url: string; size: number };

type Row = {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'done' | 'error';
  url?: string;
  error?: string;
};

export function FileUpload({
  onChange,
  onBusyChange,
}: {
  onChange: (files: UploadedFile[]) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function publish(next: Row[]) {
    setRows(next);
    onChange(
      next
        .filter((r): r is Row & { url: string } => r.status === 'done' && Boolean(r.url))
        .map((r) => ({ name: r.name, url: r.url, size: r.size })),
    );
    onBusyChange(next.some((r) => r.status === 'uploading'));
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;

    const incoming = Array.from(fileList).slice(0, MAX_FILES - rows.length);
    let working: Row[] = [...rows];

    for (const file of incoming) {
      const id = `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      if (!hasAllowedExtension(file.name, ALLOWED_UPLOAD_EXTENSIONS)) {
        working = [
          ...working,
          { id, name: file.name, size: file.size, status: 'error', error: `Unsupported file type. Accepted: ${ALLOWED_UPLOAD_EXTENSIONS.join(', ')}` },
        ];
        publish(working);
        continue;
      }

      if (file.size > MAX_FILE_BYTES) {
        working = [
          ...working,
          { id, name: file.name, size: file.size, status: 'error', error: `File is ${formatBytes(file.size)}. Limit is ${formatBytes(MAX_FILE_BYTES)} per file.` },
        ];
        publish(working);
        continue;
      }

      working = [...working, { id, name: file.name, size: file.size, status: 'uploading' }];
      publish(working);

      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });

        working = working.map((r) => (r.id === id ? { ...r, status: 'done' as const, url: blob.url } : r));
        publish(working);
      } catch (error) {
        working = working.map((r) =>
          r.id === id
            ? {
                ...r,
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Upload failed. Try again or email the file instead.',
              }
            : r,
        );
        publish(working);
      }
    }

    if (inputRef.current) inputRef.current.value = '';
  }

  function removeRow(id: string) {
    publish(rows.filter((r) => r.id !== id));
  }

  if (!uploadsEnabled) {
    return (
      <div>
        <p className="eyebrow">Project documents</p>
        <div className="mt-3 border border-dashed border-warm-300 bg-warm-100 px-4 py-5 text-sm text-graphite-600">
          File upload is not enabled on this site yet. Submit the form and we will reply so you can send plans,
          specifications, or the bid package directly.
        </div>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="project-files" className="eyebrow block">
        Project documents
        <span className="ml-1 normal-case tracking-normal text-warm-400">(optional)</span>
      </label>

      <input
        ref={inputRef}
        id="project-files"
        type="file"
        multiple
        accept={UPLOAD_ACCEPT}
        onChange={(e) => handleFiles(e.target.files)}
        disabled={rows.length >= MAX_FILES}
        className="mt-3 block w-full cursor-pointer border border-warm-300 bg-warm-50 p-3 text-sm text-graphite-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-ink file:px-4 file:py-2 file:font-mono file:text-[0.6875rem] file:uppercase file:tracking-label file:text-warm-50 disabled:opacity-50"
      />

      <p className="mt-2 text-xs text-graphite-500">
        {ALLOWED_UPLOAD_EXTENSIONS.join(', ')} · up to {formatBytes(MAX_FILE_BYTES)} each · {MAX_FILES} files max
      </p>

      {rows.length > 0 ? (
        <ul className="mt-4 divide-y divide-warm-300 border-y border-warm-300">
          {rows.map((row) => (
            <li key={row.id} className="flex items-start justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-ink">{row.name}</p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-label text-graphite-500">
                  {row.status === 'uploading' && 'Uploading…'}
                  {row.status === 'done' && `Attached · ${formatBytes(row.size)}`}
                  {row.status === 'error' && 'Failed'}
                </p>
                {row.error ? <p className="mt-1 text-xs text-vulpine-800">{row.error}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="shrink-0 font-mono text-[0.625rem] uppercase tracking-label text-graphite-500 underline underline-offset-4 hover:text-vulpine-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
