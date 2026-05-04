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

export const essays: Essay[] = [
  // COPY: placeholder, refine
  {
    slug: "on-credentialing",
    title: "On Credentialing",
    subtitle: "What a credential earns and what it doesn't.",
    date: "2026-04-20",
    readingTime: "6 min",
    excerpt:
      "A credential is a claim with a verification path attached. It is not a substitute for the work.",
    tags: ["essay", "professional"],
    body: `A credential is, at its most useful, a compressed signal. It collapses a long history of evaluation into a single line on a page. The signal is only as honest as the institution standing behind it, and only as durable as the work that earned it.

There is a temptation, when one accumulates credentials, to confuse the marker for the territory. The diploma is not the education. The certification is not the competence. The award is not the contribution. They are pointers, addressed to a reader who lacks the time to verify the underlying claim themselves.

---PULLQUOTE: A credential is a claim with a verification path attached, nothing more.---

What credentials actually earn is a slightly higher floor in the first conversation. They get the meeting. They do not finish the meeting. The work itself, displayed in artifacts and decisions and shipped outcomes, is what closes the gap between the claim and the trust.

The honest practitioner treats credentials as receipts. They are evidence that something was paid for in time, money, and attention. They are not evidence that the work was good. The work being good is a separate, ongoing argument that has to be made every time, in front of every new audience, on the merits of what is actually in front of them.

I keep my credentials current because the world demands them, and because the institutions that issue them are, on balance, trying to do something useful. But I never let the line on the page substitute for the artifact in the room.`,
  },
  // COPY: placeholder, refine
  {
    slug: "the-publishing-imprint",
    title: "The Publishing Imprint",
    subtitle: "Why I started Drawn From.",
    date: "2026-03-08",
    readingTime: "9 min",
    excerpt:
      "There is a kind of book that the contemporary trade publishers do not make. Drawn From makes that kind.",
    tags: ["essay", "publishing"],
    body: `I started Drawn From because the books I wanted to read were not being made anymore, and the books that were being made had a strange new sameness to them. The covers had begun to look identical. The interior typography had become an afterthought. The objects themselves no longer felt like they had been considered.

A book is, among other things, an industrial artifact. The paper has a weight. The binding has a tension. The margins have a relationship to the eye. When those choices are made carelessly, the reader feels it before they have finished the first page, even if they cannot name what they are feeling.

---PULLQUOTE: A book is a small machine for slowing the reader down on purpose.---

The imprint exists to make a particular kind of object: print-derived, durable, and aware of its own materiality. The titles are chosen because the form serves the argument. A book is a small machine for slowing the reader down on purpose, and certain ideas only land at that speed.

Drawn From does not compete with the trade publishers on volume or velocity. It cannot. What it offers instead is a different contract with the reader: fewer titles, longer attention per title, and a consistent house standard that the reader can feel in their hands.

The economics are difficult. The audience is small. The work is slow. None of that is a problem. The problem would be making books that did not justify their own existence as objects, and Drawn From is, above all, a refusal to do that.`,
  },
  // COPY: placeholder, refine
  {
    slug: "notes-on-mba",
    title: "Notes on the MBA",
    subtitle: "Halfway through the program.",
    date: "2026-02-14",
    readingTime: "5 min",
    excerpt: "What the program teaches that the textbooks don't.",
    tags: ["note", "mba"],
    body: `Halfway through the program, the most useful lesson has not been any single framework. It has been the texture of how decisions actually get made inside organizations that are pretending to be more rational than they are.

The textbooks teach the analysis. The case discussions teach the politics. The two are not the same skill, and the second one cannot be acquired from a book. It has to be watched, in a room, in real time, with stakes that feel real even when they are constructed.

The cohort matters more than the curriculum. The curriculum is largely fixed and largely available elsewhere. The cohort is unrepeatable. The conversations after class, the messy partial drafts shared at one in the morning, the small disagreements that surface real differences in worldview — those are the part of the program that does not show up on the transcript.

I came in with a working theory of how organizations decide. I am leaving with a more complicated one. That, more than any of the specific tools, is what I will carry forward.`,
  },
];
