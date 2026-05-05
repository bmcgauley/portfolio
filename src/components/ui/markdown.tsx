import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type Variant = "compact" | "prose" | "tight";

/**
 * Renders user-authored markdown in the brand's typography. Three variants:
 * - `compact`  → for descriptions/excerpts/abstracts (tighter spacing).
 * - `prose`    → for long-form essay bodies (generous leading + my-spacing).
 * - `tight`    → for card/inline descriptions inside line-clamp boxes;
 *                paragraphs have no margins and inherit parent typography
 *                so existing text-* / font-* / italic classes still apply.
 *
 * Raw HTML is stripped (react-markdown's default). Supports GFM:
 * tables, strikethrough, task lists, autolinks.
 */
export function Markdown({
  content,
  variant = "compact",
  className,
}: {
  content: string;
  variant?: Variant;
  className?: string;
}) {
  const isProse = variant === "prose";
  const isTight = variant === "tight";
  const paragraphClass = isProse
    ? "font-serif text-body-lg text-ink leading-[1.7] my-6"
    : isTight
      ? "m-0"
      : "font-serif text-body text-ink leading-[1.6] my-3";

  return (
    <div className={cn(className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ ...props }) => <p className={paragraphClass} {...props} />,
          h1: ({ ...props }) => (
            <h2
              className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-10 mb-4"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h3
              className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink mt-8 mb-3"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h4
              className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink mt-6 mb-2"
              {...props}
            />
          ),
          h4: ({ ...props }) => (
            <p
              className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mt-6 mb-2"
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-ink" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-gold-shadow" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-crimson-deep underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul
              className="list-disc list-outside pl-6 font-serif text-body text-ink space-y-1 my-3 marker:text-gold-shadow"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="list-decimal list-outside pl-6 font-serif text-body text-ink space-y-1 my-3 marker:text-gold-shadow"
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="leading-[1.55]" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-gold pl-4 italic text-gold-shadow my-4"
              {...props}
            />
          ),
          code: ({ ...props }) => (
            <code
              className="font-mono text-caption bg-parchment text-ink px-1.5 py-0.5 rounded-[2px]"
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <pre
              className="font-mono text-caption bg-parchment text-ink p-4 rounded-[2px] overflow-x-auto my-4"
              {...props}
            />
          ),
          hr: () => (
            <hr className="border-0 border-t border-gold-shadow/30 my-8" />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="w-full font-serif text-body text-ink border-collapse"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep text-left py-2 border-b border-gold"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td className="py-2 border-b border-gold-shadow/30" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
