"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

type Props = {
  /** Hidden form field name; the URL gets submitted under this. */
  name: string;
  /** Comma-separated file type filter, e.g. ".pdf" or "image/*". */
  accept?: string;
  /** Existing URL on edit pages — shown as "Current: …" caption. */
  defaultUrl?: string;
  /** Required at create time; optional on edit (existing URL preserved if blank). */
  required?: boolean;
  /** Folder prefix in the blob store, e.g. "publications/academic". */
  pathPrefix: string;
  id?: string;
};

type UploadState =
  | { kind: "idle" }
  | { kind: "uploading"; progress: number }
  | { kind: "uploaded"; url: string; filename: string }
  | { kind: "error"; message: string };

export function BlobFileInput({
  name,
  accept,
  defaultUrl,
  required,
  pathPrefix,
  id,
}: Props) {
  const [state, setState] = useState<UploadState>({ kind: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUrl =
    state.kind === "uploaded" ? state.url : (defaultUrl ?? "");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setState({ kind: "uploading", progress: 0 });

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const key = `${pathPrefix}/${Date.now()}-${safeName}`;
      const blob = await upload(key, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
        onUploadProgress: (progress) => {
          setState({
            kind: "uploading",
            progress: Math.round(progress.percentage),
          });
        },
      });
      setState({ kind: "uploaded", url: blob.url, filename: file.name });
    } catch (err) {
      setState({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Upload failed. Try again.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={currentUrl} />
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={state.kind === "uploading"}
        // Required only when there's no existing or freshly uploaded URL.
        required={required && !currentUrl}
        className={INPUT_CLASS}
      />

      {state.kind === "idle" && defaultUrl ? (
        <p className="font-serif italic text-caption text-ink-muted mt-2">
          Current:{" "}
          <a
            href={defaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-crimson-deep underline-offset-4 hover:underline break-all"
          >
            {defaultUrl.split("/").pop()}
          </a>
          {" — leave empty to keep."}
        </p>
      ) : null}

      {state.kind === "uploading" ? (
        <div className="mt-3">
          <div className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-1">
            Uploading · {state.progress}%
          </div>
          <div className="h-1 bg-parchment rounded-[1px] overflow-hidden">
            <div
              className="h-full bg-crimson-deep transition-all duration-150"
              style={{ width: `${state.progress}%` }}
            />
          </div>
        </div>
      ) : null}

      {state.kind === "uploaded" ? (
        <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mt-2">
          Uploaded · {state.filename}
        </p>
      ) : null}

      {state.kind === "error" ? (
        <p className="font-serif italic text-caption text-crimson mt-2">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
