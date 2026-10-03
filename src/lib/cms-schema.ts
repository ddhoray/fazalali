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
      { key: "coreEyebrow", label: "Core statement label", def: "A core statement" },
      { key: "coreHeading", label: "Core statement heading", def: "The ethics of AI must be the preserve of all cultures and continents." },
      { key: "coreBody", label: "Core statement body", def: "Every agency, company, institution and country designing, developing and deploying AI architectures has an obligation to incorporate a more geographically, culturally and socially diverse array of perspectives.", long: true },
    ],
  },
  {
    key: "profile",
    label: "Profile",
    path: "/about",
    fields: [
      { key: "testimonialsHeading", label: "Testimonials heading", def: "In others' words" },
      { key: "testimonialsIntro", label: "Testimonials intro", def: "Colleagues, students and collaborators on the work.", long: true },
      { key: "heroEyebrow", label: "Hero label", def: "Profile" },
      { key: "heroTitle", label: "Hero title", def: "A prophet provocateur, schooled in freedom." },
      { key: "heroIntro", label: "Hero introduction", def: "Dr. Fazal Ibrahim Ali, Cambridge Commonwealth Scholar, former Provost of the University of Trinidad and Tobago, President of NIHERST, and the author of Education for Liberty.", long: true },
      { key: "aboutBody", label: "About paragraph", def: "A thinker, consultant, academic and technical expert exploring how AI is shaping the future of innovation, drawing upon Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.", long: true },
    ],
  },
  { key: "books", label: "Books", path: "/books", fields: [
    { key: "heroTitle", label: "Hero title", def: "The work, in volumes." },
    { key: "heroIntro", label: "Hero introduction", def: "A body of writing built on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice, Caribbean in origin, global in address.", long: true },
    { key: "forthcomingHeading", label: "Forthcoming heading", def: "Books to come." },
    { key: "forthcomingIntro", label: "Forthcoming introduction", def: "Three volumes in preparation, each extending the Omeros AI argument into a distinct register of public life.", long: true },
  ]},
  { key: "gallery", label: "Gallery", path: "/gallery", fields: [
    { key: "heroTitle", label: "Hero title", def: "The gallery." },
    { key: "heroIntro", label: "Hero introduction", def: "A curated selection of paintings, colour, coastline, and the canvas life of a working writer.", long: true },
  ]},
  { key: "ecology", label: "Ecology", path: "/ecology", fields: [
    { key: "heroTitle", label: "Hero title", def: "Ecology." },
    { key: "heroIntro", label: "Hero introduction", def: "Not a body of work, a note. Ecology appears in the writing mostly where it is borrowed: the ethics we now ask of artificial intelligence were first argued out in conservation.", long: true },
  ]},
  { key: "inequality", label: "Inequality", path: "/inequality", fields: [
    { key: "heroTitle", label: "Hero title", def: "Inequality." },
    { key: "heroIntro", label: "Hero introduction", def: "No one is enough. No single thought is the perfect answer to all of our problems in the age of AI. We need everyone to collaborate and produce new knowledge.", long: true },
  ]},
  { key: "palimpsest", label: "Palimpsest", path: "/palimpsest", fields: [
    { key: "heroTitle", label: "Hero title", def: "A palimpsest of West Indian education." },
    { key: "heroIntro", label: "Hero introduction", def: "Set inside a frame of world events before and after Christopher Columbus set sail for the New World in 1492, from Oxford in 1096 to the JFK Library in 1969, from the Encomienda to Eric Williams.", long: true },
  ]},
  { key: "omeros", label: "Omeros AI", path: "/omeros-ai", fields: [
    { key: "heroTitle", label: "Hero title", def: "Omeros." },
    { key: "heroIntro", label: "Hero introduction", def: "Omeros is the Greek name for Homer, the poet of the sea, of journeys, of voices passed from one generation to the next. It is the name Fazal Ali gives to a Caribbean initiative in artificial intelligence.", long: true },
    { key: "manifesto", label: "Manifesto quote", def: "Omeros AI exists to open up honest debate about AI in the West Indies, to build capacity across the region, and to nest our small island futures inside the global conversation on intelligence, on terms set, in part, from here.", long: true },
  ]},
  { key: "podcast", label: "Podcast", path: "/podcast", fields: [
    { key: "heroTitle", label: "Hero title", def: "The podcast." },
    { key: "heroIntro", label: "Hero introduction", def: "A monograph, read aloud. Begin at the Preface, continue with the Prolegomenon, long-form, unhurried, made for headphones.", long: true },
  ]},
  { key: "contact", label: "Contact", path: "/contact", fields: [
    { key: "heading", label: "Heading", def: "A short note is enough." },
    { key: "intro", label: "Introduction", def: "Press, residencies, teaching, or a question about the writing, all read by him personally.", long: true },
    { key: "success", label: "Success message", def: "Thank you. He will reply as soon as he can.", long: true },
  ]},
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
  ecology: { label: "Ecology sections", description: "Sections shown on Ecology. Once populated, these replace the built-in sections.", titleLabel: "Section heading", subtitleLabel: "Label", bodyLabel: "Paragraphs (separate with a blank line)", linkLabel: null, image: true },
  inequality: { label: "Inequality sections", description: "Sections shown on Inequality. Once populated, these replace the built-in sections.", titleLabel: "Section heading", subtitleLabel: "Label", bodyLabel: "Paragraphs (separate with a blank line)", linkLabel: null, image: true },
  omeros: { label: "Omeros AI", description: "Pillars and strategic goals on the Omeros AI page.", titleLabel: "Heading", subtitleLabel: "Number or year", bodyLabel: "Description", linkLabel: null, image: true, pagePicker: ["pillar", "goal"] },
  podcast: { label: "Podcast", description: "Podcast episodes. Once populated, these replace the built-in episode list.", titleLabel: "Episode title", subtitleLabel: "Series subtitle", bodyLabel: "Episode description", linkLabel: "Audio file URL", image: false },
  profile_roles: { label: "Profile timeline", description: "Professional background entries shown on the Profile page.", titleLabel: "Institution / period", subtitleLabel: "Optional short label", bodyLabel: "Description", linkLabel: null, image: false },
  home_ideas: { label: "Homepage ideas", description: "The areas of inquiry shown on the homepage.", titleLabel: "Idea", subtitleLabel: "Destination path", bodyLabel: "Short description", linkLabel: "Destination URL", image: false },
  home_streams: { label: "Homepage streams", description: "The three practice cards shown on the homepage.", titleLabel: "Stream title", subtitleLabel: "Kicker", bodyLabel: "Description", linkLabel: "Destination URL", image: true },
} as const;
export type CollectionKey = keyof typeof COLLECTIONS;
