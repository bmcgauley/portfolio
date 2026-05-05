import { Button } from "@/components/ui/button";

type PdfViewerProps = {
  src: string;
  title: string;
  allowDownload?: boolean;
};

export function PdfViewer({ src, title, allowDownload }: PdfViewerProps) {
  // Always hide the side thumbnails panel.
  // When download is disallowed, ALSO hide the toolbar (which contains the
  // download/print buttons in Chrome's PDF viewer). #navpanes=0 hides the
  // left panel; #toolbar=0 hides the entire top toolbar; #download=0 is a
  // non-standard hint some viewers respect. These are best-effort —
  // determined users can always save a PDF they can view.
  const allow = allowDownload !== false;
  const fragment = allow ? "#navpanes=0" : "#navpanes=0&toolbar=0&download=0";
  const iframeSrc = `${src}${fragment}`;

  return (
    <div className="space-y-4">
      <div className="bg-vellum p-3 border border-gold rounded-[2px]">
        <iframe
          src={iframeSrc}
          className="w-full h-[80vh] rounded-[2px]"
          title={title}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {allow ? (
          <p className="font-serif italic text-ink-muted text-caption">
            PDF rendered inline. Use the download button for an offline copy.
          </p>
        ) : (
          <p className="font-serif italic text-ink-muted text-caption">
            Read-only — download disabled by author.
          </p>
        )}
        {allow ? (
          <Button variant="secondary" asChild>
            <a href={src} download>
              Download PDF
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
