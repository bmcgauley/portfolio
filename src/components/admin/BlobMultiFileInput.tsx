"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

type Props = {
  /** Hidden form field name; the URL list (JSON-encoded) is submitted under this. */
  name: string;
  /** Comma-separated file type filter, e.g. "image/*". */
  accept?: string;
  /** Existing URLs on edit pages — rendered as removable thumbnails. */
  defaultUrls?: string[];
  /** Folder prefix in the blob store, e.g. "projects/gallery". */
  pathPrefix: string;
  id?: string;
};

type UploadStatus =
  | { kind: "idle" }
  | { kind: "uploading"; current: number; total: number; progress: number }
  | { kind: "error"; message: string };

export function BlobMultiFileInput({
  name,
  accept = "image/jpeg,image/png,image/webp",
  defaultUrls = [],
  pathPrefix,
  id,
}: Props) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [status, setStatus] = useState<UploadStatus>({ kind: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFilesSelected(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const uploaded: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const key = `${pathPrefix}/${Date.now()}-${i}-${safeName}`;
        const blob = await upload(key, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
          onUploadProgress: (progress) => {
            setStatus({
              kind: "uploading",
              current: i + 1,
              total: files.length,
              progress: Math.round(progress.percentage),
            });
          },
        });
        uploaded.push(blob.url);
      } catch (err) {
        setStatus({
          kind: "error",
          message:
            err instanceof Error
              ? `${file.name}: ${err.message}`
              : `${file.name}: upload failed`,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (uploaded.length > 0) setUrls((prev) => [...prev, ...uploaded]);
        return;
      }
    }

    setUrls((prev) => [...prev, ...uploaded]);
    setStatus({ kind: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeAt(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    setUrls((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        multiple
        accept={accept}
        onChange={handleFilesSelected}
        disabled={status.kind === "uploading"}
        className={INPUT_CLASS}
      />

      {status.kind === "uploading" ? (
        <div className="mt-3">
          <div className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-1">
            Uploading {status.current} of {status.total} · {status.progress}%
          </div>
          <div className="h-1 bg-parchment rounded-[1px] overflow-hidden">
            <div
              className="h-full bg-crimson-deep transition-all duration-150"
              style={{ width: `${status.progress}%` }}
            />
          </div>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <p className="font-serif italic text-caption text-crimson mt-2">
          {status.message}
        </p>
      ) : null}

      {urls.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {urls.map((url, idx) => (
            <div
              key={url}
              className="relative bg-vellum border border-gold-shadow rounded-[2px] p-2"
            >
              <div className="relative aspect-square bg-bone rounded-[2px] overflow-hidden">
                <Image
                  src={url}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Move left"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-shadow hover:text-crimson-deep disabled:opacity-30 disabled:cursor-not-allowed px-1"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === urls.length - 1}
                    aria-label="Move right"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-shadow hover:text-crimson-deep disabled:opacity-30 disabled:cursor-not-allowed px-1"
                  >
                    →
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  aria-label="Remove image"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-crimson hover:text-crimson-deep"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
