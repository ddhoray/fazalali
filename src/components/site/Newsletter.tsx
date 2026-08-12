import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { BlurReveal } from "./BlurReveal";

/**
 * Editorial newsletter sign-up block.
 * Client-side only, shows a thank-you state on submit.
 */
export function Newsletter() {
 const [email, setEmail] = useState("");
 const [done, setDone] = useState(false);

 function onSubmit(e: FormEvent<HTMLFormElement>) {
 e.preventDefault();
 if (!email || !email.includes("@")) return;
 setDone(true);
  }

 return (
    <section data-nav="dark" className="section-invert relative border-t hairline">
      <div className="mx-auto grid max-w-[1700px] grid-cols-1 gap-10 px-5 py-10 sm:px-8 md:grid-cols-12 md:gap-14 md:py-12">
        <div className="md:col-span-6">
          <BlurReveal as="p" className="eyebrow text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-3.5 opacity-70" /> The Letter · No. 01
            </span>
          </BlurReveal>
          <BlurReveal
 as="h2"
 delay={0.08}
 className="mt-5 font-display text-[12vw] leading-[0.95] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            A letter, <em className="">now and then.</em>
          </BlurReveal>
          <BlurReveal
 delay={0.16}
 className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Occasional dispatches, new journal entries, notes from forthcoming books, and quiet
 reports from Omeros AI. No noise. No tracking. Read once, leave
 anytime.
          </BlurReveal>
        </div>

        <div className="md:col-span-6 md:pl-6 lg:pl-12">
          <BlurReveal delay={0.18}>
            {done ? (
              <div className="flex h-full min-h-[160px] flex-col justify-center border-t hairline pt-8">
                <p className="eyebrow text-muted-foreground">Received</p>
                <p className="mt-3 font-display text-2xl leading-snug md:text-3xl">
                  Thank you. The next letter will find you.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="border-t hairline pt-8">
                <label htmlFor="newsletter-email" className="eyebrow text-muted-foreground">
                  Your email
                </label>
                <div className="mt-4 flex items-end gap-4 border-b hairline pb-3">
                  <input
 id="newsletter-email"
 type="email"
 required
 placeholder="you@somewhere.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full bg-transparent font-display text-2xl tracking-tight outline-none placeholder:text-muted-foreground/60 md:text-3xl"
                  />
                  <button
 type="submit"
 className="group btn-cta btn-on-blue shrink-0"
                  >
                    Subscribe
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  By subscribing you agree to receive occasional emails. No
 spam, ever.
                </p>
              </form>
            )}
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
