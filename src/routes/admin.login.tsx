import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { adminCheckPhone, adminLogin } from "@/lib/admin/admin.functions";
import mark from "@/assets/brand-omeros-mark.png";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Sign in, Omeros Admin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Sign in to manage the Omeros website." },
      { property: "og:title", content: "Sign in, Omeros Admin" },
      { property: "og:description", content: "Sign in to manage the Omeros website." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const check = useServerFn(adminCheckPhone);
  const login = useServerFn(adminLogin);
  const navigate = useNavigate();

  async function onPhone(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (phone.replace(/\D/g, "").length < 10) return setError("Enter a 10-digit mobile number.");
    setBusy(true);
    const r = await check({ data: { phone } }).catch(() => ({ exists: false }));
    setBusy(false);
    if (!r.exists) return setError("This number isn't registered as an Omeros team member.");
    setStep("otp");
  }

  async function verify(code: string) {
    setBusy(true);
    setError("");
    const r = await login({ data: { phone, otp: code } }).catch(() => ({ ok: false as const, error: "Something went wrong." }));
    setBusy(false);
    if (!r.ok) {
      setError(r.error);
      setOtp("");
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-foreground text-background lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="flex items-center gap-3">
          <img src={mark} alt="" className="size-10 object-contain invert" />
          <span className="font-display text-xl">Omeros</span>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-background/60">Content studio</p>
          <h1 className="mt-6 max-w-lg font-display text-6xl leading-[0.95] tracking-tight">
            Every word, image and idea, <em className="text-omeros not-italic">in one place.</em>
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-background/65">
            Write journal entries, curate the gallery, update books and pages, and keep an eye on who reads what.
          </p>
        </div>
        <p className="text-xs text-background/50">Fazal Ibrahim Ali · Omeros AI</p>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <img src={mark} alt="" className="mb-10 size-10 object-contain lg:hidden" />
          <p className="text-[11px] uppercase tracking-[0.26em] text-omeros">Admin sign in</p>
          {step === "phone" ? (
            <form onSubmit={onPhone} className="mt-4">
              <h2 className="font-display text-4xl tracking-tight">Welcome back.</h2>
              <p className="mt-3 text-sm text-muted-foreground">Enter your registered mobile number to continue.</p>
              <label className="mt-10 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground" htmlFor="phone">
                Mobile number
              </label>
              <div className="mt-2 flex border border-border focus-within:border-omeros">
                <span className="flex items-center border-r border-border px-3 text-sm text-muted-foreground">+91</span>
                <input
                  id="phone"
                  inputMode="numeric"
                  autoFocus
                  autoComplete="tel"
                  maxLength={14}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d ]/g, ""))}
                  className="w-full bg-transparent px-3 py-3 text-lg tracking-wider outline-none"
                  placeholder="98765 43210"
                />
              </div>
              {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
              <button disabled={busy} className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-foreground py-3.5 text-sm uppercase tracking-[0.2em] text-background disabled:opacity-60">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <>Continue <ArrowRight className="size-4" /></>}
              </button>
            </form>
          ) : (
            <div className="mt-4">
              <button onClick={() => { setStep("phone"); setOtp(""); setError(""); }} className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-3" /> Change number
              </button>
              <h2 className="font-display text-4xl tracking-tight">Enter your code.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Use the access code for <span className="text-foreground">+91 {phone}</span>.
              </p>
              <div className="mt-10">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  autoFocus
                  onChange={(v) => {
                    setOtp(v);
                    if (v.length === 4) verify(v);
                  }}
                >
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <InputOTPSlot key={i} index={i} className="size-14 border border-border text-xl first:rounded-none last:rounded-none" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
              <button
                disabled={busy || otp.length < 4}
                onClick={() => verify(otp)}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-foreground py-3.5 text-sm uppercase tracking-[0.2em] text-background disabled:opacity-60"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : <>Verify & sign in <ShieldCheck className="size-4" /></>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
