import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Loader2, Camera, FileText } from "lucide-react";

interface Props {
  onBack: () => void;
  onDone: () => void;
  kraValid: boolean;
}

type Step = "loading" | "success" | "need-details" | "selfie" | "signing" | "submitted";

export default function OpenGripDPFlow({ onBack, onDone, kraValid }: Props) {
  const [step, setStep] = useState<Step>("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(kraValid ? "success" : "need-details");
    }, 2000);
    return () => clearTimeout(timer);
  }, [kraValid]);

  if (step === "loading") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h2 className="text-base font-bold text-foreground">Open Grip DP</h2>
        </div>
        <div className="flex flex-col items-center py-16">
          <Loader2 size={40} className="text-grip-navy animate-spin mb-4" />
          <p className="text-sm font-semibold text-foreground">Updating your details…</p>
          <p className="text-xs text-muted-foreground mt-1">Checking KRA status</p>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full bg-grip-teal/15 flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-grip-teal" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Demat Account Opened!</h2>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Your Demat has been opened successfully via Grip's depository partner. You can now invest.
          </p>
        </div>
        <button onClick={onDone} className="grip-cta-teal active:scale-[0.98] transition-transform">
          Continue to Invest →
        </button>
      </div>
    );
  }

  if (step === "need-details") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h2 className="text-base font-bold text-foreground">Open Grip DP</h2>
        </div>

        <div className="flex flex-col items-center text-center py-6">
          <div className="w-14 h-14 rounded-full bg-grip-amber/15 flex items-center justify-center mb-4">
            <FileText size={24} className="text-grip-amber" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">
            Before opening your Demat, we need a few details
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Complete a quick selfie verification and sign the account opening form to proceed.
          </p>

          {/* Steps preview */}
          <div className="w-full rounded-xl bg-grip-bg p-4 mb-6 text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-grip-navy flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Selfie Verification</p>
                <p className="text-xs text-muted-foreground">Quick liveness check</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-grip-navy flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Sign Account Opening Form</p>
                <p className="text-xs text-muted-foreground">E-sign your AOF document</p>
              </div>
            </div>
          </div>

          <button onClick={() => setStep("selfie")} className="grip-cta active:scale-[0.98] transition-transform">
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === "selfie") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => setStep("need-details")} className="active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h2 className="text-base font-bold text-foreground">Selfie Verification</h2>
        </div>

        <div className="flex flex-col items-center text-center py-6">
          <div className="w-32 h-32 rounded-full border-[3px] border-dashed border-grip-navy/30 flex items-center justify-center mb-6 bg-grip-bg">
            <Camera size={40} className="text-grip-navy/40" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">
            Take a Selfie
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            Position your face within the circle and ensure good lighting. We'll verify your identity instantly.
          </p>

          <div className="w-full rounded-xl bg-grip-bg p-3 mb-6">
            <ul className="space-y-1.5 text-xs text-muted-foreground text-left">
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-grip-teal shrink-0" />
                Remove glasses or face coverings
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-grip-teal shrink-0" />
                Ensure bright, even lighting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-grip-teal shrink-0" />
                Look directly at the camera
              </li>
            </ul>
          </div>

          <button onClick={() => setStep("signing")} className="grip-cta active:scale-[0.98] transition-transform">
            Capture Selfie
          </button>
        </div>
      </div>
    );
  }

  if (step === "signing") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => setStep("selfie")} className="active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h2 className="text-base font-bold text-foreground">Sign Account Opening Form</h2>
        </div>

        <div className="flex flex-col items-center text-center py-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-grip-teal flex items-center justify-center">
                <CheckCircle size={12} className="text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-grip-teal">Selfie</span>
            </div>
            <div className="w-8 h-0.5 bg-grip-border" />
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-grip-navy flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground">2</span>
              </div>
              <span className="text-xs font-semibold text-foreground">E-Sign</span>
            </div>
          </div>

          <div className="w-14 h-14 rounded-full bg-grip-bg flex items-center justify-center mb-4">
            <FileText size={24} className="text-grip-navy" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">
            Review & Sign Your AOF
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Your Account Opening Form has been pre-filled. Review the details and e-sign to complete Demat account opening.
          </p>

          {/* Mock AOF preview */}
          <div className="w-full rounded-xl border border-grip-border bg-card p-4 mb-6 text-left space-y-2">
            <p className="text-xs text-muted-foreground mb-2">Account Opening Form</p>
            {[
              ["Name", "Rahul Sharma"],
              ["PAN", "ABCDE1234F"],
              ["Depository", "CDSL (via Grip)"],
              ["Account Type", "Beneficiary"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-xs font-semibold text-foreground">{val}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setStep("submitted")} className="grip-cta active:scale-[0.98] transition-transform">
            E-Sign & Submit
          </button>
        </div>
      </div>
    );
  }

  // submitted
  return (
    <div className="px-5 pb-6 pt-2">
      <div className="flex flex-col items-center py-10">
        <div className="w-16 h-16 rounded-full bg-grip-teal/15 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-grip-teal" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">Application Submitted!</h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Your Demat account opening request has been submitted. We'll notify you once it's active.
        </p>
      </div>
      <button onClick={onDone} className="grip-cta active:scale-[0.98] transition-transform">
        Done
      </button>
    </div>
  );
}
