/** Editable page text fields. `def` is the current site copy, used when nothing is saved. */
export type PageField = { key: string; label: string; def: string; long?: boolean };
export type PageSchema = { key: string; label: string; path: string; fields: PageField[] };

export const PAGE_SCHEMAS: PageSchema[] = [
  {
    key: "home",
    label: "Homepage",
    path: "/",
    fields: [
      { key: "journalEyebrow", label: "Journal section label", def: "From the Journal" },
      { key: "journalHeading", label: "Journal section heading", def: "Recent pieces." },
    ],
  },
  {
    key: "profile",
    label: "Profile",
    path: "/about",
    fields: [
      { key: "testimonialsHeading", label: "Testimonials heading", def: "In others' words" },
      { key: "testimonialsIntro", label: "Testimonials intro", def: "Colleagues, students and collaborators on the work.", long: true },
    ],
  },
];

export const COLLECTIONS = {
  books: {
    label: "Books",
    description: "Forthcoming books shown on the Books page, after the built-in titles.",
    titleLabel: "Book title",
    subtitleLabel: "Status / year (e.g. Forthcoming · 2027)",
    bodyLabel: "Description",
    linkLabel: "Link (optional)",
    image: true,
  },
  gallery: {
    label: "Gallery",
    description: "Artworks added here appear first in the Gallery page grid.",
    titleLabel: "Artwork title",
    subtitleLabel: "Caption (optional)",
    bodyLabel: "Alt text (describe the image)",
    linkLabel: null,
    image: true,
  },
  palimpsest: {
    label: "Palimpsest",
    description: "Additional Palimpsest sections, shown after the existing ten.",
    titleLabel: "Section title",
    subtitleLabel: "Year / eyebrow",
    bodyLabel: "Section text",
    linkLabel: null,
    image: true,
  },
  readings: {
    label: "Ecology & Inequality",
    description: "Selected readings links. Choose which page each one appears on.",
    titleLabel: "Reading title",
    subtitleLabel: "Source / publisher",
    bodyLabel: "Short note (optional)",
    linkLabel: "Link",
    image: true,
    pagePicker: ["ecology", "inequality"],
  },
  testimonials: {
    label: "Testimonials",
    description: "Quotes shown on the Profile page. Featured ones appear first.",
    titleLabel: "Name",
    subtitleLabel: "Role / organisation",
    bodyLabel: "Quote",
    linkLabel: null,
    image: true,
  },
} as const;
export type CollectionKey = keyof typeof COLLECTIONS;
