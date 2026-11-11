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
      img("splashLogo", "Splash logo (shown on first visit)", "Opening splash"),
      t("splashEnabled", "Show splash screen (yes / no)", "yes", "Opening splash"),
      t("splashSeconds", "Splash duration in seconds", "1.6", "Opening splash"),
      t("splashTagline", "Splash line under the logo (optional)", "", "Opening splash"),
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
      t("heroTitle", "Hero title", "A prophet provocateur for freedom.", "Hero banner"),
      l("heroIntro", "Hero text", "Dr Fazal Ibrahim Ali, born in the West Indies, and tutored in Cambridge. Omeros AI is written from Trinidad for “Inforgs” anywhere who suspect the conversation has been too narrow for too long. A critical theory of AI must be grounded in local history, the indeterminacy of knowing, and the contingency of selfhood. Our modern world is now a thing of the past. Our postmodern world can only define itself in terms of what it has only just-now-ceased to be.", "Hero banner"),
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
      t("affiliationsShort", "Institution line (separate names with commas)", "Cambridge, UWI, TSC, UTT, NIHERST", "Banner"),
      l("affiliationsFull", "Full affiliation names (one per line)", "UNESCO Memory of the World\nUniversity Consortium of Small Island States (UCSIS)\nInstitute of Critical Thinking UWI\nIDB", "Banner"),
      l("aboutBody", "About paragraph", "A thinker, consultant, academic and technical expert exploring how AI is shaping the future of innovation, drawing upon Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice.", "About"),
      t("testimonialsHeading", "Testimonials heading", "In others' words", "Testimonials"),
      l("testimonialsIntro", "Testimonials intro", "Colleagues, students and collaborators on the work.", "Testimonials"),
    ],
  },
  { key: "books", label: "Books", path: "/books", fields: [
    ...hero("Books", "The Work in Three (III) Volumes", "A body of writing built on Amartya Sen's Development as Freedom and John Rawls' A Theory of Justice, Caribbean in origin, global in address."),
    l("printQuotes", "Monograph quotes slideshow (one quote per paragraph, blank line between; end with the page, e.g. (p. vi))", "“Information technology and nascent artificial intelligence, however, have created a new Schumpeterian capitalism, driven by the release of the imagination centring our being-in-the-world (Dasein) on the richness and abundance of free information” (p. vi).\n\n“It would be irresponsible to think that in an age when technology is evolving faster than ever before, progress in artificial intelligence (AI) and in brain science will not converge. Given the potential of AI and, in particular, of technology that enables machines to think faster than humans, the idea that someday it will have a sizable impact on us does not seem to be contentious. Such pragmatism lends itself to big questions. What does it mean to be human? How do we define creativity? What might be the range of possible intelligences that might arise in AI? Is it likely that any self-enhanced descendant of AI would be approachable, thus evading all existential peril? What intelligences are yet to be included in the spectrum of human multiple intelligences? Where is West Indian education in this information revolution? How do we future-proof the West Indian workforce? How is West Indian education to provision itself to leave the berths of its colonial anchorage? What futures are we genuinely educating for?” (p. vii).\n\n“Somewhere, somehow, the future of artificial intelligence, the future of work, the future of the West Indies, the future of lifelong learning and rebooting careers in the workplace and the future of West Indian schooling must all meet openly. This monograph provokes that encounter with our future today” (p. xix).", "In print"),
    t("forthcomingHeading", "Forthcoming heading", "Books to come.", "Forthcoming"),
    l("forthcomingIntro", "Forthcoming introduction", "Three volumes in preparation, each extending the Omeros AI argument into a distinct register of public life.", "Forthcoming"),
  ]},
  { key: "education", label: "Education for Liberty", path: "/education-for-liberty", fields: hero("", "", "") },
  { key: "writing", label: "Journal", path: "/writing", fields: hero("", "", "") },
  { key: "gallery", label: "Gallery", path: "/gallery", fields: hero("", "The gallery.", "A curated selection of paintings that highlights the canvas life of a working writer.") },
  { key: "ecology", label: "Ecology", path: "/ecology", fields: hero("", "Ecology.", "The ethics of AI finds its footing in earth sciences.") },
  { key: "inequality", label: "Inequality", path: "/inequality", fields: hero("", "Inequality.", "No one is enough. No single thought is the perfect answer to all of our problems in the age of AI. We need everyone to collaborate and produce new knowledge.") },
  { key: "palimpsest", label: "Palimpsest", path: "/palimpsest", fields: hero("", "A palimpsest of West Indian education.", "Set inside a frame of world events before and after Christopher Columbus set sail for the New World in 1492, from Oxford in 1096 to the JFK Library in 1969, from the Encomienda to Eric Williams.") },
  { key: "omeros", label: "Omeros AI", path: "/omeros-ai", fields: [
    ...hero("", "Omeros.", ""),
    l("manifesto", "Manifesto quote", "We need open and honest conversations about AI in the West Indies to build capacity and nest our small island futures inside the global conversation on terms set, in part, from here.", "Manifesto"),
  ]},
  { key: "podcast", label: "Podcast", path: "/podcast", fields: hero("", "The podcast.", "Listen to the Preface, and continue to the Prolegomenon") },
  { key: "contact", label: "Contact", path: "/contact", fields: [
    t("heading", "Heading", "A short note is enough."),
    l("intro", "Introduction", "Press, residencies, teaching, or a question about the writing, all read by him personally."),
    l("success", "Success message", "Thank you. He will reply as soon as he can."),
  ]},
];

/** Search & sharing fields on every page (empty = the built-in title/description). */
for (const p of PAGE_SCHEMAS) {
  if (p.key === "site") continue;
  p.fields.push(
    t("seoTitle", "Search title (browser tab & Google)", "", "Search & sharing"),
    l("seoDescription", "Search description", "", "Search & sharing"),
    img("seoImage", "Sharing image (link previews)", "Search & sharing"),
  );
}

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
    description: "Forthcoming books on the Books page. Use [words](https://link) inside the description for inline links.",
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
    description: "The Palimpsest timeline sections. Once populated, these replace the built-in sections.",
    titleLabel: "Section title",
    subtitleLabel: "Image caption (optional)",
    bodyLabel: "Timeline entries (separate with a blank line)",
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
  education_chapters: { label: "Education for Liberty themes", description: "The 'Ideas & themes' chapters on the Education for Liberty page. Once populated, these replace the built-in chapters.", titleLabel: "Theme title", subtitleLabel: "Numeral (e.g. I, II)", bodyLabel: "Description", linkLabel: null, image: false },
  field_notes: { label: "Field notes photos", description: "The Field notes photos on Ecology and the rotating photo strip on Inequality. Once populated for a page, these replace its built-in photos.", titleLabel: "Image description (alt text)", subtitleLabel: "Caption (optional)", bodyLabel: "Note (optional)", linkLabel: null, image: true, pagePicker: ["ecology", "inequality"] },
} as const;
export type CollectionKey = keyof typeof COLLECTIONS;
