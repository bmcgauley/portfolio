// Top-level Photography route. The full page implementation lives at
// /about/photography/page.tsx — this is a thin alias so the work surfaces
// in the primary nav. Both URLs render identical content; the existing
// /about/photography URL is preserved for inbound links.
export { default } from "../about/photography/page";

export const metadata = {
  title: "Photography",
  description:
    "Personal photography practice — landscapes, astrophotography, and other visual work.",
};
