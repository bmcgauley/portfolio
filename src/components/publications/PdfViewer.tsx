import { Button } from "@/components/ui/button";

type PdfViewerProps = {
  src: string;
  title: string;
};

export function PdfViewer({ src, title }: PdfViewerProps) {
  return (
    <div className="space-y-4">
      <div className="bg-vellum p-3 border border-gold rounded-[2px]">
        <iframe
          src={src}
          className="w-full h-[80vh] rounded-[2px]"
          title={title}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-serif italic text-ink-muted text-caption">
          PDF rendered inline. Use the download button for an offline copy.
        </p>
        <Button variant="secondary" asChild>
          <a href={src} download>
            Download PDF
          </a>
        </Button>
      </div>
    </div>
  );
}
