import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { GlassPanel } from "@/components/site/GlassPanel";
import { submitContact } from "@/lib/contact.functions";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Write Me — Fazal Ali" },
      { name: "description", content: "Press, residencies, conversations on AI and the Caribbean — write Fazal Ali." },
      { property: "og:title", content: "Write Me — Fazal Ali" },
      { property: "og:description", content: "Send a note to Fazal Ali." },
      { property: "og:url", content: "https://omeros-cipher-glass.lovable.app/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://omeros-cipher-glass.lovable.app/contact" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const send = useServerFn(submitContact);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setState("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pt-24 pb-12 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Write me</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] text-balance md:text-8xl">
          A short note <em className="italic">is enough.</em>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Press, residencies, teaching, or a question about the writing — all read personally.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <GlassPanel strong className="mt-14 p-8 md:p-12">
          {state === "sent" ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="glass flex size-14 items-center justify-center rounded-none">
                <Check className="size-6" />
              </div>
              <p className="font-display text-3xl">Note received.</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Thank you. I'll reply from <span className="text-foreground">writeme@fazalali.com</span> as soon as I can.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-6">
              <Field label="Your name">
                <input name="name" required maxLength={120} className={inputCls} placeholder="Jane Doe" />
              </Field>
              <Field label="Email">
                <input name="email" type="email" required maxLength={200} className={inputCls} placeholder="you@domain.com" />
              </Field>
              <Field label="Message">
                <textarea name="message" required minLength={4} maxLength={4000} rows={6} className={inputCls} placeholder="Say a little about what you're writing or working on…" />
              </Field>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Or email <a href="mailto:writeme@fazalali.com" className="underline">writeme@fazalali.com</a>
                </p>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="inline-flex items-center gap-2 rounded-none bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {state === "sending" ? "Sending…" : "Send note"}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          )}
        </GlassPanel>
      </Reveal>
    </div>
  );
}

const inputCls =
  "w-full rounded-none border border-foreground/15 bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-foreground/40 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
