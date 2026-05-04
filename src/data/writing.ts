export type Essay = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string;
  tags?: string[];
};

// Essays will be authored and added via the admin panel (planned).
// Body supports `\n\n` paragraph breaks and `---PULLQUOTE: text---` markers
// rendered by /writing/[slug]/page.tsx.
export const essays: Essay[] = [];
