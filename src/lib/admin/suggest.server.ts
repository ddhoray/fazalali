/**
 * Built-in editorial suggestions that need no external AI service.
 *
 * Tags and summaries are extracted from the article itself, weighted against
 * the rest of the Journal (TF-IDF over every article in cms_articles), so
 * words that are distinctive for this piece rank above words every article
 * uses. Existing site tags are preferred, keeping the taxonomy consistent.
 * Output follows the house style: British English, no em dashes.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type SuggestKind = "seo_title" | "seo_description" | "excerpt" | "alt" | "tags";

const STOP = new Set(
  (
    "a about above after again against all also am an and any are aren't as at be because been before being below between both but by can can't cannot could couldn't did didn't do does doesn't doing don't down during each even ever every few for from further get gets got had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself him himself his how how's however i i'd i'll i'm i've if in into is isn't it it's its itself just last let's like made make makes many may me might more most much must mustn't my myself new no nor not now of off on once one only or other ought our ours ourselves out over own per put rather really s said same say says see seen shall shan't she she'd she'll she's should shouldn't since so some still such t than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those though through thus to too toward towards two under until up upon us use used uses using very via was wasn't way we we'd we'll we're we've well were weren't what what's when when's where where's whether which while who who's whom whose why why's will with within without won't would wouldn't yet you you'd you'll you're you've your yours yourself yourselves also across along already although among another around become becomes becoming beyond cannot came come comes could different done either else enough especially etc far first former great greater however include includes including indeed instead it's know known large later least less likely long look lot lower main mainly meanwhile mostly need needs never next often ones part perhaps place possible quite rather recent recently second seem seems several shall show shows significant simply small something sometimes soon take takes taken thing things think three today together top truly unlike us whereas whole within year years time times day days people world"
  ).split(/\s+/),
);

const ACRONYMS = new Set(["ai", "eu", "us", "uk", "un", "gdp", "agi", "llm", "llms", "caricom", "imf", "who", "oecd", "ict", "r&d", "iot", "esg", "covid-19"]);

type Corpus = { df: Map<string, number>; docs: number; tagVocab: Map<string, string>; at: number };
let corpusCache: Corpus | null = null;

const stripHtml = (h: string) =>
  h
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;|&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function words(text: string): string[] {
  return (text.toLowerCase().match(/[a-z][a-z0-9'&-]*[a-z0-9]|[a-z]/g) ?? []).map((w) => w.replace(/'s$/, ""));
}

/** Unigrams and bigrams, skipping stopwords and phrases that start or end on one. */
function terms(text: string): string[] {
  const w = words(text);
  const out: string[] = [];
  for (let i = 0; i < w.length; i++) {
    const a = w[i];
    if (!STOP.has(a) && a.length > 2) out.push(a);
    const b = w[i + 1];
    if (b && !STOP.has(a) && !STOP.has(b) && a.length > 1 && b.length > 2) out.push(`${a} ${b}`);
  }
  return out;
}

async function corpus(): Promise<Corpus> {
  if (corpusCache && Date.now() - corpusCache.at < 60 * 60 * 1000) return corpusCache;
  const { data } = await supabaseAdmin.from("cms_articles").select("title, body_html, tags");
  const df = new Map<string, number>();
  const tagCounts = new Map<string, Map<string, number>>();
  for (const row of data ?? []) {
    for (const t of new Set(terms(`${row.title} ${stripHtml(row.body_html ?? "")}`))) df.set(t, (df.get(t) ?? 0) + 1);
    for (const tag of (row.tags as string[] | null) ?? []) {
      const key = tag.trim().toLowerCase();
      if (!key || key === "uncategorized") continue;
      const forms = tagCounts.get(key) ?? new Map<string, number>();
      forms.set(tag.trim(), (forms.get(tag.trim()) ?? 0) + 1);
      tagCounts.set(key, forms);
    }
  }
  // Pick the most used spelling of each tag (e.g. "AI" over "ai").
  const tagVocab = new Map<string, string>();
  for (const [key, forms] of tagCounts) tagVocab.set(key, [...forms.entries()].sort((x, y) => y[1] - x[1])[0][0]);
  corpusCache = { df, docs: Math.max(1, data?.length ?? 1), tagVocab, at: Date.now() };
  return corpusCache;
}

/** True when every occurrence of the phrase is capitalised ("Bridgetown Initiative"). */
function properPhrase(term: string, original: string): boolean {
  const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+")}\\b`, "gi");
  const hits = original.match(re) ?? [];
  return hits.length > 0 && hits.every((h) => h.split(/\s+/).every((w) => /^[A-Z]/.test(w)));
}

function rankTerms(text: string, c: Corpus, keep: Set<string> = new Set()): { term: string; score: number }[] {
  const tf = new Map<string, number>();
  for (const t of terms(text)) tf.set(t, (tf.get(t) ?? 0) + 1);
  const scored: { term: string; score: number }[] = [];
  for (const [term, n] of tf) {
    const isBigram = term.includes(" ");
    if (isBigram && n < 2) continue;
    if (isBigram && !keep.has(term) && (c.df.get(term) ?? 0) < 2 && !c.tagVocab.has(term) && !properPhrase(term, text)) continue;
    const idf = Math.log((c.docs + 1) / ((c.df.get(term) ?? 0) + 1)) + 1;
    scored.push({ term, score: (1 + Math.log(n)) * idf * (isBigram ? 1.6 : 1) });
  }
  scored.sort((a, b) => b.score - a.score);
  // Drop unigrams already covered by a stronger bigram ("supply" under "supply chain").
  const kept: { term: string; score: number }[] = [];
  for (const s of scored) {
    if (!s.term.includes(" ") && kept.some((k) => k.term.includes(" ") && k.term.split(" ").includes(s.term))) continue;
    kept.push(s);
    if (kept.length >= 40) break;
  }
  return kept;
}

function display(term: string, original: string): string {
  if (ACRONYMS.has(term)) return term.toUpperCase();
  // Reuse the capitalisation the author used most (proper nouns, "Pax Silica").
  const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+")}\\b`, "gi");
  const seen = new Map<string, number>();
  for (const m of original.match(re) ?? []) seen.set(m.replace(/\s+/g, " "), (seen.get(m) ?? 0) + 1);
  const best = [...seen.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  if (best && /[A-Z]/.test(best) && best !== best.toUpperCase()) return best;
  return term
    .split(" ")
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w))
    .join(" ");
}

function sentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]+["”’)]*|[^.!?]+$/g) ?? [])
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 5);
}

const house = (s: string) => s.replace(/\s*[—–]\s*/g, ", ").replace(/\s+/g, " ").trim();

function clip(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 0)).replace(/[,;:\s]+$/, "")}…`;
}

/** De-duplicate case-insensitively, treating singular and plural ("AI model"/"AI models") as one. */
function uniq(list: string[]): string[] {
  const seen = new Set<string>();
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/-/g, " ")
      .split(" ")
      .map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w))
      .join(" ");
  return list.filter((s) => s && !seen.has(norm(s)) && seen.add(norm(s)));
}

export async function localSuggestions(kind: SuggestKind, title: string, rawText: string): Promise<string[]> {
  const text = house(stripHtml(rawText));
  const t = house(title.trim());

  if (kind === "alt") {
    const vocab = (await corpus()).df;
    const split = (w: string) => {
      const lw = w.toLowerCase();
      if (lw.length < 10 || vocab.has(lw)) return w;
      const best: (string[] | null)[] = [[]];
      for (let i = 1; i <= lw.length; i++) {
        best[i] = null;
        for (let j = Math.max(0, i - 20); j < i; j++) {
          const piece = lw.slice(j, i);
          if (best[j] && piece.length > 1 && vocab.has(piece) && (!best[i] || best[j]!.length + 1 < best[i]!.length)) best[i] = [...best[j]!, piece];
        }
      }
      return best[lw.length]?.join(" ") ?? w;
    };
    const base = t
      .replace(/\.[a-z0-9]{2,5}$/i, "")
      .replace(/^[a-z0-9]{6,10}[-_]/i, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\d{2,4}x\d{2,4}\b/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map(split)
      .join(" ");
    const subject = base ? base.charAt(0).toUpperCase() + base.slice(1) : "Image";
    const ctx = text ? clip(text, 80) : "";
    return uniq([
      clip(subject, 120),
      clip(`Photograph of ${subject.charAt(0).toLowerCase()}${subject.slice(1)}`, 120),
      ctx ? clip(`${subject}: ${ctx}`, 120) : clip(`${subject}, featured on the Fazal Ali site`, 120),
    ]);
  }

  const c = await corpus();
  const full = `${t}. ${text}`;
  const titleTerms = new Set(terms(t));
  const ranked = rankTerms(full, c, titleTerms);

  if (kind === "tags") {
    const lowerFull = full.toLowerCase();
    // Existing site tags that genuinely appear in this piece.
    const vocabHits = [...c.tagVocab.entries()]
      .filter(([key]) => key.length > 1 && new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(lowerFull))
      .map(([key, form]) => ({ key, form, score: ranked.find((r) => r.term === key)?.score ?? 0.5 }))
      .sort((a, b) => b.score - a.score)
      .map((v) => (ACRONYMS.has(v.key) ? v.key.toUpperCase() : v.form));
    const phrases = ranked.map((r) => display(r.term, full));
    const titleFirst = ranked.filter((r) => titleTerms.has(r.term)).map((r) => display(r.term, full));
    const set = (xs: string[], n: number) => uniq(xs).slice(0, n).join(", ");
    return uniq([
      set([...vocabHits.slice(0, 3), ...phrases], 6),
      set([...titleFirst, ...phrases.slice(0, 8)], 5),
      set([...phrases.filter((p) => p.includes(" ")), ...vocabHits, ...phrases], 5),
    ]).filter(Boolean);
  }

  const sents = sentences(text);
  if (!sents.length) return t ? [clip(t, kind === "seo_title" ? 60 : 155)] : [];
  const weight = new Map(ranked.map((r) => [r.term, r.score]));
  const sentScore = sents.map((s, i) => {
    const ts = terms(s);
    const sum = ts.reduce((acc, x) => acc + (weight.get(x) ?? 0), 0);
    return { s, i, score: sum / Math.sqrt(ts.length + 4) + (i === 0 ? 2 : i < 3 ? 1 : 0) };
  });
  const best = [...sentScore].sort((a, b) => b.score - a.score);
  const inOrder = (xs: typeof sentScore) => [...xs].sort((a, b) => a.i - b.i).map((x) => x.s).join(" ");

  if (kind === "excerpt") {
    const pair = (xs: typeof sentScore) => {
      const two = inOrder(xs.slice(0, 2));
      return two.length <= 320 ? two : clip(xs[0].s, 320);
    };
    return uniq([
      pair(sentScore.slice(0, 2)),
      pair(best.slice(0, 2)),
      pair([best[0], ...best.slice(2)].filter(Boolean)),
    ]);
  }

  if (kind === "seo_description") {
    const fit = (parts: string[]) => {
      let out = "";
      for (const p of parts) {
        const next = out ? `${out} ${p}` : p;
        if (next.length > 155) break;
        out = next;
      }
      return out.length >= 110 ? out : clip(parts.join(" "), 155);
    };
    return uniq([fit(sents), fit(best.map((b) => b.s)), fit(best.slice(1).map((b) => b.s))]);
  }

  // seo_title
  // Key phrases that add something the title does not already say.
  const titleWords = new Set(words(t).flatMap((w) => w.split("-")).map((w) => w.replace(/s$/, "")));
  const fresh = ranked
    .filter((r) => r.term.split(/[ -]/).every((w) => !titleWords.has(w.replace(/s$/, ""))))
    .map((r) => display(r.term, full))
    .map((k) => k.charAt(0).toUpperCase() + k.slice(1));
  const fits = (x: string) => x.length <= 60;
  const candidates = [
    t,
    `${t} | Fazal Ali`,
    ...fresh.slice(0, 4).map((k) => `${t}: ${k}`),
    ...fresh.slice(0, 2).map((k) => `${k}: ${t}`),
    ...fresh.slice(0, 2).map((k) => `${k} | Fazal Ali`),
  ].filter(fits);
  const out = uniq(candidates).slice(0, 3);
  return out.length ? out : [clip(t, 60)];
}
