import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, X } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";

type State = "idle" | "sending" | "sent" | "error";

let externalOpen: ((v: boolean) => void) | null = null;

export function openContactDrawer() {
  externalOpen?.(true);
}

export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(submitContact);

  useEffect(() => {
    setMounted(true);
    externalOpen = setOpen;
    return () => {
      externalOpen = null;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-md backdrop-saturate-150"
          />
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[121] max-h-[92svh] overflow-y-auto bg-background text-foreground shadow-2xl"
          >
            <div className="mx-auto max-w-3xl px-5 pb-10 pt-6 sm:px-10 sm:pb-14 sm:pt-8">
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Write to him
                  </p>
                  <h2 className="mt-2 font-display text-4xl leading-[0.95] sm:text-5xl">
                    A short note <em className="">is enough.</em>
                  </h2>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-none border border-foreground/15 hover:bg-foreground/5"
                >
                  <X className="size-5" />
                </button>
              </div>

              {state === "sent" ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="flex size-14 items-center justify-center border border-foreground/15">
                    <Check className="size-6" />
                  </div>
                  <p className="font-display text-3xl">Note received.</p>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thank you. He will reply from{" "}
                    <span className="text-foreground">writeme@fazalali.com</span> as soon as he can.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-5">
                  <Field label="Your name">
                    <input
                      name="name"
                      required
                      maxLength={120}
                      className={inputCls}
                      placeholder="Jane Doe"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      className={inputCls}
                      placeholder="you@domain.com"
                    />
                  </Field>
                  <Field label="Message">
                    <textarea
                      name="message"
                      required
                      minLength={4}
                      maxLength={4000}
                      rows={5}
                      className={inputCls}
                      placeholder="Say a little about what you're writing or working on…"
                    />
                  </Field>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                      Or email{" "}
                      <a href="mailto:writeme@fazalali.com" className="underline">
                        writeme@fazalali.com
                      </a>
                    </p>
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="btn-cta btn-primary disabled:opacity-60"
                    >
                      {state === "sending" ? "Sending…" : "Send note"}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

const inputCls =
  "w-full rounded-none border border-foreground/15 bg-background/55 backdrop-blur-sm px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-foreground/40 focus:outline-none transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
