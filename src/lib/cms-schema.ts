/**
 * Every editable item on the public site. `def` is the built-in copy used when nothing is saved.
 * Media fields default to "" which means "use the built-in file".
 * Text supports *asterisks* for the accent italic; `links` fields hold one "Label | /path" per line.
 */
export type FieldType = "text" | "long" | "image" | "video" | "audio" | "url" | "links";
export type PageField = { key: string; label: string; def: string; long?: boolean; type?: FieldType; group?: string };
export type PageSchema = { key: string; label: string; path: string; fields: PageField[] };

const t = (key: string, label: string, def: string, group?: string): PageField => ({ key, label, def, group });
const l = (key: string, label: string, def: string, group?: string): PageField => ({ key, label, def, long: true, type: "long", group });
const img = (key: string, label: string, group?: string): PageField => ({ key, label, def: "", type: "image", group });
const vid = (key: string, label: string, group?: string): PageField => ({ key, label, def: "", type: "video", group });
const url = (key: string, label: string, def: string, group?: string): PageField => ({ key, label, def, type: "url", group });
const links = (key: string, label: string, def: string, group?: string): PageField => ({ key, label, def, type: "links", group });

/** Standard banner fields read by <PageHero cmsKey="…">. */
const hero = (eyebrow: string, title: string, intro: string): PageField[] => [
  t("heroEyebrow", "Banner label", eyebrow, "Banner"),
  t("heroTitle", "Banner title", title, "Banner"),
  l("heroIntro", "Banner introduction", intro, "Banner"),
  img("heroImage", "Banner image", "Banner"),
  vid("heroVideo", "Banner video (replaces image)", "Banner"),
];

export function fieldType(f: PageField): FieldType {
  return f.type ?? (f.long ? "long" : "text");
}

export const PAGE_SCHEMAS: PageSchema[] = [
  {
    key: "site",
    label: "Navigation & footer",
    path: "/",
    fields: [
      links("navPrimary", "Menu: main links", "Profile | /about\nBooks | /books\nJournal | /writing\nPodcast | /podcast\nGallery | /gallery", "Desktop menu"),
      links("navSecondary", "Menu: secondary links", "Ecology | /ecology\nInequality | /inequality\nPalimpsest | /palimpsest\nEducation for Liberty | /education-for-liberty\nOmeros AI | /omeros-ai", "Desktop menu"),
      t("menuLabel", "Menu panel label", "Menu", "Desktop menu"),
      t("menuCta", "Menu button text", "Write to him", "Desktop menu"),
      img("dockLogo", "Menu logo", "Desktop menu"),
      links("navMobile", "Mobile menu links", "Books | /books\nJournal | /writing\nPodcast | /podcast\nAbout | /about\nGallery | /gallery\nEcology | /ecology\nInequality | /inequality\nPalimpsest | /palimpsest", "Mobile menu"),
      img("mobileLogo", "Mobile logo", "Mobile menu"),
      t("contactLabel", "Contact label", "Write to him", "Footer"),
      t("email", "Contact email", "writeme@fazalali.com", "Footer"),
      t("location", "Location line", "Trinidad & Tobago, West Indies", "Footer"),
      t("indexLabel", "Index label", "Index", "Footer"),
      links("footerLinks", "Footer links", "Books | /books\nJournal | /writing\nPodcast | /podcast\nProfile | /about\nEducation for Liberty | /education-for-liberty\nPalimpsest | /palimpsest\nInequality | /inequality\nEcology | /ecology\nGallery | /gallery", "Footer"),
      t("elsewhereLabel", "Social label", "Elsewhere", "Footer"),
      links("socialLinks", "Social links (Instagram etc.)", "Instagram, @thefazalali | https://www.instagram.com/thefazalali/", "Footer"),
      t("wordmark", "Large footer wordmark", "FAZAL ALI", "Footer"),
      t("copyright", "Copyright name", "Fazal Ibrahim Ali", "Footer"),
      t("creditPrefix", "Credit text", "Designed & developed by", "Footer"),
      t("creditName", "Credit name", "HyperRevamp", "Footer"),
      url("creditUrl", "Credit link", "https://hyperrevamp.com", "Footer"),
      t("nlEyebrow", "Newsletter label", "The Letter · No. 01", "Newsletter"),
      t("nlHeading", "Newsletter heading", "A letter, *now and then.*", "Newsletter"),
      l("nlBody", "Newsletter text", "Occasional dispatches, new journal entries, notes from forthcoming books, and quiet reports from Omeros AI. No noise. No tracking. Read once, leave anytime.", "Newsletter"),
      t("nlButton", "Newsletter button", "Subscribe", "Newsletter"),
      t("nlSuccess", "Newsletter thank-you", "Thank you. The next letter will find you.", "Newsletter"),
      t("nlFine", "Newsletter small print", "By subscribing you agree to receive occasional emails. No spam, ever.", "Newsletter"),
    ],
  },
  {
    key: "home",
    label: "Homepage",
    path: "/",
    fields: [
      vid("heroVideo", "Hero video (with its sound)", "Hero banner"),
      img("heroLogo", "Hero logo", "Hero banner"),
      t("heroEyebrow", "Hero label", "Omeros AI :West Indies & the World", "Hero banner"),
      t("heroTitle", "Hero title", "A prophet provocateur, schooled in freedom.", "Hero banner"),
      l("heroIntro", "Hero text", "Dr. Fazal Ibrahim Ali, born here in Trinidad and educated at Cambridge. Critical theory on artificial intelligence, written from the West Indies, for a reader anywhere who suspects the conversation has been *too narrow for too long - and who wants to change its nature.*", "Hero banner"),
      t("heroHint", "Scroll hint", "Scroll to explore", "Hero banner"),
      t("quietLeft", "Strip: left", "Est. Trinidad, 1974", "Strip under hero"),
      t("quietCenter", "Strip: centre", "This is the next world.", "Strip under hero"),
      t("quietRight", "Strip: right", "Issue 01 / Folio I", "Strip under hero"),
      t("coreEyebrow", "Core statement label", "A core statement", "Core statement"),
      t("coreHeading", "Core statement heading", "The ethics of AI must be the preserve of all cultures and continents.", "Core statement"),
      l("coreBody", "Core statement body", "Every agency, company, institution and country designing, developing and deploying AI architectures has an obligation to incorporate a more geographically, culturally and socially diverse array of perspectives.", "Core statement"),
      t("ideasEyebrow", "Ideas label", "Ideas & themes", "Ideas & themes"),
      t("ideasHeading", "Ideas heading", "Areas of *inquiry.*", "Ideas & themes"),
      t("ideasCta", "Ideas link text", "All entries →", "Ideas & themes"),
      t("ideasCardCta", "Card link text", "Read", "Ideas & themes"),
      img("deskImage", "Quiet desk image", "Quiet desk"),
      t("deskEyebrow", "Quiet desk label", "A quiet desk", "Quiet desk"),
      t("deskHeading", "Quiet desk heading", "Slow reading, *long sentences.*", "Quiet desk"),
      t("noteEyebrow", "Note label", "A note before reading", "Note before reading"),
      l("noteText", "Note text", "Goodness, as rationality, does not attribute any special virtue to the process of deciding. Human thinking is imperfect. The AI frontier opens the possibility to augment each person's Agility Quotient (AQ) to think better. In that ferment lies the possibility of a blossoming of human ideas boosted by AI. The true challenge is therefore to build AI systems that prompt us to think more benevolently than we naturally do.", "Note before reading"),
      img("portraitImage", "Fazal Ali portrait", "Portrait"),
      t("portraitWord1", "Wordmark line 1", "FAZAL", "Portrait"),
      t("portraitWord2", "Wordmark line 2", "ALI", "Portrait"),
      t("portraitNameplate", "Nameplate", "Trinidad · Cambridge · 2026", "Portrait"),
      t("portraitCta", "Button text", "More about Fazal", "Portrait"),
      url("portraitCtaLink", "Button link", "/about", "Portrait"),
      t("bookEyebrowLeft", "Top label (left)", "The Monograph · 2026", "Monograph"),
      t("bookEyebrowRight", "Top label (right)", "Foreword · Epilogue", "Monograph"),
      img("bookCover", "Book cover", "Monograph"),
      t("bookKicker", "Small label", "A Monograph · FIA", "Monograph"),
      t("bookTitle", "Title", "Education for Liberty.", "Monograph"),
      l("bookTagline", "Tagline", "A manifesto for releasing the imagination.", "Monograph"),
      t("forewordName", "Foreword by", "Sir George Alleyne", "Monograph"),
      t("forewordCreds", "Foreword credentials", "M.D., F.R.C.P., F.A.C.P. (Hon), DSc (Hon)", "Monograph"),
      t("epilogueName", "Epilogue by", "Archbishop Joseph Everard Harris", "Monograph"),
      t("epilogueCreds", "Epilogue credentials", "C.S.Sp.", "Monograph"),
      t("bookCta1", "First button", "Read the monograph", "Monograph"),
      url("bookCta1Link", "First button link", "/education-for-liberty", "Monograph"),
      t("bookCta2", "Second button", "Request a copy", "Monograph"),
      url("bookCta2Link", "Second button link", "/contact", "Monograph"),
      t("streamsEyebrow", "Label", "Omeros, the house, not a project inside it", "Omeros, the house"),
      t("streamsHeading", "Heading", "One practice, *three streams.*", "Omeros, the house"),
      l("streamsIntro", "Introduction", "One body of work under a single name, research, publishing, and the conversation around both.", "Omeros, the house"),
      t("journalEyebrow", "Journal label", "From the Journal", "Journal"),
      t("journalHeading", "Journal heading", "Recent pieces.", "Journal"),
      t("journalCta", "Journal link text", "All entries →", "Journal"),
    ],
  },
  {
    key: "profile",
    label: "Profile",
    path: "/about",
    fields: [
      ...hero("Profile", "A prophet provocateur, schooled in freedom.", "Dr. Fazal Ibrahim Ali, Cambridge Commonwealth Scholar, former Provost of the University of Trinidad and Tobago, President of NIHERST, and the author of Education for Liberty."),
      l("aboutBody", "About paragraph", "A thinker, consultant, academic and technical expert exploring how AI is shaping the future of innovation, drawing upon Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.", "About"),
      t("testimonialsHeading", "Testimonials heading", "In others' words", "Testimonials"),
      l("testimonialsIntro", "Testimonials intro", "Colleagues, students and collaborators on the work.", "Testimonials"),
    ],
  },
  { key: "books", label: "Books", path: "/books", fields: [
    ...hero("Books", "The work, in volumes.", "A body of writing built on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice, Caribbean in origin, global in address."),
    t("forthcomingHeading", "Forthcoming heading", "Books to come.", "Forthcoming"),
    l("forthcomingIntro", "Forthcoming introduction", "Three volumes in preparation, each extending the Omeros AI argument into a distinct register of public life.", "Forthcoming"),
  ]},
  { key: "education", label: "Education for Liberty", path: "/education-for-liberty", fields: hero("", "", "") },
  { key: "writing", label: "Journal", path: "/writing", fields: hero("", "", "") },
  { key: "gallery", label: "Gallery", path: "/gallery", fields: hero("", "The gallery.", "A curated selection of paintings, colour, coastline, and the canvas life of a working writer.") },
  { key: "ecology", label: "Ecology", path: "/ecology", fields: hero("", "Ecology.", "Not a body of work, a note. Ecology appears in the writing mostly where it is borrowed: the ethics we now ask of artificial intelligence were first argued out in conservation.") },
  { key: "inequality", label: "Inequality", path: "/inequality", fields: hero("", "Inequality.", "No one is enough. No single thought is the perfect answer to all of our problems in the age of AI. We need everyone to collaborate and produce new knowledge.") },
  { key: "palimpsest", label: "Palimpsest", path: "/palimpsest", fields: hero("", "A palimpsest of West Indian education.", "Set inside a frame of world events before and after Christopher Columbus set sail for the New World in 1492, from Oxford in 1096 to the JFK Library in 1969, from the Encomienda to Eric Williams.") },
  { key: "omeros", label: "Omeros AI", path: "/omeros-ai", fields: [
    ...hero("", "Omeros.", "Omeros is the Greek name for Homer, the poet of the sea, of journeys, of voices passed from one generation to the next. It is the name Fazal Ali gives to a Caribbean initiative in artificial intelligence."),
    l("manifesto", "Manifesto quote", "Omeros AI exists to open up honest debate about AI in the West Indies, to build capacity across the region, and to nest our small island futures inside the global conversation on intelligence, on terms set, in part, from here.", "Manifesto"),
  ]},
  { key: "podcast", label: "Podcast", path: "/podcast", fields: hero("", "The podcast.", "A monograph, read aloud. Begin at the Preface, continue with the Prolegomenon, long-form, unhurried, made for headphones.") },
  { key: "contact", label: "Contact", path: "/contact", fields: [
    t("heading", "Heading", "A short note is enough."),
    l("intro", "Introduction", "Press, residencies, teaching, or a question about the writing, all read by him personally."),
    l("success", "Success message", "Thank you. He will reply as soon as he can."),
  ]},
];

/** Parse a `links` field: one "Label | /path" per line. */
export function parseLinks(v: string): { label: string; to: string }[] {
  return v
    .split("\n")
    .map((line) => line.split("|").map((x) => x.trim()))
    .filter(([a, b]) => a && b)
    .map(([label, to]) => ({ label, to }));
}

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
