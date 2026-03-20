import { useState } from "react";
import { ArrowLeft, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface Props {
  onBack: () => void;
  onDone: () => void;
}

type KRAState = "checking" | "valid" | "invalid";
type Step = "main" | "success" | "review";

const steps = [
  "KRA Validated",
  "Open Demat",
  "Modify Demat in CBRICS",
  "Mark UCC Active",
];

export default function OpenGripDPFlow({ onBack, onDone }: Props) {
  const [kraState, setKraState] = useState<KRAState>("checking");
  const [step, setStep] = useState<Step>("main");

  if (step === "success") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full bg-grip-teal/15 flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-grip-teal" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Demat Opening Initiated</h2>
          <p className="text-sm text-muted-foreground text-center">Your Demat account is being set up. You'll be notified once it's active.</p>
        </div>
        <button onClick={onDone} className="grip-cta active:scale-[0.98] transition-transform">Done</button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full bg-grip-amber/15 flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-grip-amber" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Submitted for Review</h2>
          <p className="text-sm text-muted-foreground text-center">Your request is pending review. We'll get back to you shortly.</p>
        </div>
        <button onClick={onDone} className="grip-cta active:scale-[0.98] transition-transform">Done</button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-6 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="text-base font-bold text-foreground">Open Grip DP</h2>
      </div>

      {/* PAN info */}
      <div className="rounded-xl bg-grip-bg p-4 mb-4">
        <p className="text-xs text-muted-foreground">PAN on file</p>
        <p className="text-sm font-semibold text-foreground mt-0.5">ABCDE1234F</p>
      </div>

      {/* KRA Status */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-foreground">KRA Validation Status</p>
        {kraState === "checking" && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-grip-amber/15 text-grip-amber animate-pulse-amber">
            Checking…
          </span>
        )}
        {kraState === "valid" && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-grip-teal/15 text-grip-teal">
            Valid ✓
          </span>
        )}
        {kraState === "invalid" && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-grip-red/15 text-grip-red">
            Invalid ✗
          </span>
        )}
      </div>

      {/* Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-grip-border mb-5">
        <button
          onClick={() => setKraState("valid")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            kraState === "valid" ? "bg-grip-navy text-primary-foreground" : "bg-card text-foreground"
          }`}
        >
          KRA Valid
        </button>
        <button
          onClick={() => setKraState("invalid")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            kraState === "invalid" ? "bg-grip-navy text-primary-foreground" : "bg-card text-foreground"
          }`}
        >
          KRA Invalid
        </button>
      </div>

      {/* Outcome */}
      {kraState === "valid" && (
        <>
          <div className="rounded-xl bg-grip-teal/10 border border-grip-teal/20 p-4 mb-5">
            <p className="text-sm text-foreground">
              <strong>KRA Validated</strong> — your KYC is confirmed. Demat will be opened and UCC activated in CBRICS.
            </p>
          </div>

          {/* Step tracker */}
          <div className="space-y-0 mb-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {i === 0 ? (
                    <div className="w-7 h-7 rounded-full bg-grip-teal flex items-center justify-center">
                      <CheckCircle size={14} className="text-primary-foreground" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-grip-navy flex items-center justify-center">
                      <span className="text-xs font-bold text-foreground">{i + 1}</span>
                    </div>
                  )}
                  {i < steps.length - 1 && <div className="w-0.5 h-6 bg-grip-border" />}
                </div>
                <p className={`text-sm pt-1 ${i === 0 ? "font-semibold text-grip-teal" : "text-foreground"}`}>{s}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setStep("success")} className="grip-cta-teal active:scale-[0.98] transition-transform">
            Proceed to Open Demat →
          </button>
        </>
      )}

      {kraState === "invalid" && (
        <>
          <div className="rounded-xl bg-grip-red/10 border border-grip-red/20 p-4 mb-5">
            <p className="text-sm text-foreground">
              <strong>KRA Validation Failed</strong> — liveness and AOF will be soft-deleted.
            </p>
          </div>

          {/* Step tracker */}
          <div className="space-y-0 mb-5">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {i === 0 ? (
                    <div className="w-7 h-7 rounded-full bg-grip-red flex items-center justify-center">
                      <Circle size={14} className="text-primary-foreground" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-grip-border flex items-center justify-center">
                      <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                    </div>
                  )}
                  {i < steps.length - 1 && <div className="w-0.5 h-6 bg-grip-border" />}
                </div>
                <p className={`text-sm pt-1 ${i === 0 ? "font-semibold text-grip-red" : "text-muted-foreground"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-grip-amber/10 border border-grip-amber/20 p-4 mb-5">
            <p className="text-xs text-foreground">
              ⚠️ Needs confirmation with Jyo before production rollout
            </p>
          </div>

          <button onClick={() => setStep("review")} className="grip-cta active:scale-[0.98] transition-transform">
            Acknowledge & Continue
          </button>
        </>
      )}
    </div>
  );
}
