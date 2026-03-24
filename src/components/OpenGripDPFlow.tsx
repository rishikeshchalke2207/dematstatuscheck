import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Loader2, Camera, FileText, AlertCircle, ShieldCheck, Fingerprint } from "lucide-react";

interface Props {
  onBack: () => void;
  onDone: () => void;
  kraValid: boolean;
}

type Step = "consent" | "loading" | "digilocker" | "selfie" | "signing" | "submitted";

export default function OpenGripDPFlow({ onBack, onDone, kraValid }: Props) {
  const [step, setStep] = useState<Step>("consent");

  useEffect(() => {
    if (step === "loading") {
      const timer = setTimeout(() => {
        if (kraValid) {
          // KRA validated in system, re-fetch confirms valid → go to AOF
          setStep("signing");
        } else {
          // KRA not validated → re-fetch confirms invalid → Digilocker → Liveness → AOF
          setStep("digilocker");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [kraValid, step]);

  if (step === "consent") {
    return <ConsentScreen onBack={onBack} onProceed={() => setStep("loading")} />;
  }

  if (step === "loading") {
    return (
      <div className="px-5 pb-6 pt-2">
        <FlowHeader onBack={onBack} title="Open Grip DP" />
        <div className="flex flex-col items-center py-16">
          <Loader2 size={40} className="text-grip-navy animate-spin mb-4" />
          <p className="text-sm font-semibold text-foreground">Verifying your details…</p>
        </div>
      </div>
    );
  }

  if (step === "digilocker") {
    return <DigilockerScreen onBack={() => setStep("consent")} onProceed={() => setStep("selfie")} />;
  }

  if (step === "selfie") {
    return <SelfieScreen onBack={() => setStep("digilocker")} onProceed={() => setStep("signing")} />;
  }

  if (step === "signing") {
    const stepsCompleted = kraValid ? 0 : 2; // 0 if direct AOF, 2 if after digilocker+selfie
    return (
      <SigningScreen
        onBack={() => kraValid ? setStep("consent") : setStep("selfie")}
        onSubmit={() => setStep("submitted")}
        stepsCompleted={stepsCompleted}
      />
    );
  }

  // submitted / success
  return <SuccessScreen onDone={onDone} />;
}

/* ── Shared Header ── */
function FlowHeader({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <button onClick={onBack} className="active:scale-95 transition-transform">
        <ArrowLeft size={20} className="text-foreground" />
      </button>
      <h2 className="text-base font-bold text-foreground">{title}</h2>
    </div>
  );
}

/* ── Consent Screen ── */
function ConsentScreen({ onBack, onProceed }: { onBack: () => void; onProceed: () => void }) {
  const [agreedDemat, setAgreedDemat] = useState(true);
  const [agreedSI, setAgreedSI] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!agreedDemat || !agreedSI) {
      setShowError(true);
      return;
    }
    onProceed();
  };

  return (
    <div className="px-5 pb-6 pt-2">
      <FlowHeader onBack={onBack} title="Open Grip DP" />

      <div className="flex flex-col items-center py-6 text-center">
        <div className="w-14 h-14 rounded-full bg-grip-navy/10 flex items-center justify-center mb-4">
          <FileText size={24} className="text-grip-navy" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">Open a Grip Demat Account</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          We'll verify your KRA details and open a lifetime free demat account with Grip.
        </p>
      </div>

      <div className="space-y-3 mb-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedDemat}
            onChange={(e) => { setAgreedDemat(e.target.checked); setShowError(false); }}
            className="mt-0.5 h-4 w-4 rounded border-grip-border accent-grip-navy shrink-0"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            By ticking this checkbox, you agree to delete your current demat details from the platform.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedSI}
            onChange={(e) => { setAgreedSI(e.target.checked); setShowError(false); }}
            className="mt-0.5 h-4 w-4 rounded border-grip-border accent-grip-navy shrink-0"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            I consent to Standing Instructions for my Grip Demat account, authorising Grip to process transactions as per the terms and conditions.
          </span>
        </label>
      </div>

      {showError && (
        <div className="flex items-center gap-2 mb-3 px-1">
          <AlertCircle size={14} className="text-destructive shrink-0" />
          <p className="text-xs text-destructive">Please tick both checkboxes to proceed.</p>
        </div>
      )}

      <button onClick={handleContinue} className="grip-cta active:scale-[0.98] transition-transform">
        Continue
      </button>
    </div>
  );
}

/* ── Digilocker Screen ── */
function DigilockerScreen({ onBack, onProceed }: { onBack: () => void; onProceed: () => void }) {
  return (
    <div className="px-5 pb-6 pt-2">
      <FlowHeader onBack={onBack} title="DigiLocker Verification" />

      <div className="flex flex-col items-center text-center py-6">
        <div className="w-14 h-14 rounded-full bg-grip-navy/10 flex items-center justify-center mb-4">
          <ShieldCheck size={24} className="text-grip-navy" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">
          Verify via DigiLocker
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          We need to verify your identity documents through DigiLocker. You'll be redirected to the DigiLocker portal to securely share your Aadhaar and PAN details.
        </p>

        <div className="w-full rounded-xl bg-grip-bg p-4 mb-6 text-left space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle size={14} className="text-grip-teal shrink-0" />
            <span className="text-xs text-muted-foreground">Government-verified identity</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={14} className="text-grip-teal shrink-0" />
            <span className="text-xs text-muted-foreground">100% secure & encrypted</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle size={14} className="text-grip-teal shrink-0" />
            <span className="text-xs text-muted-foreground">Takes less than 2 minutes</span>
          </div>
        </div>

        <button onClick={onProceed} className="grip-cta active:scale-[0.98] transition-transform">
          Proceed to DigiLocker
        </button>
      </div>
    </div>
  );
}

/* ── Selfie / Liveness Screen ── */
function SelfieScreen({ onBack, onProceed }: { onBack: () => void; onProceed: () => void }) {
  return (
    <div className="px-5 pb-6 pt-2">
      <FlowHeader onBack={onBack} title="Selfie Verification" />

      <div className="flex flex-col items-center text-center py-6">
        <div className="w-32 h-32 rounded-full border-[3px] border-dashed border-grip-navy/30 flex items-center justify-center mb-6 bg-grip-bg">
          <Camera size={40} className="text-grip-navy/40" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">Take a Selfie</h3>
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

        <button onClick={onProceed} className="grip-cta active:scale-[0.98] transition-transform">
          Capture Selfie
        </button>
      </div>
    </div>
  );
}

/* ── AOF Signing Screen ── */
function SigningScreen({ onBack, onSubmit, stepsCompleted }: { onBack: () => void; onSubmit: () => void; stepsCompleted: number }) {
  return (
    <div className="px-5 pb-6 pt-2">
      <FlowHeader onBack={onBack} title="Sign Account Opening Form" />

      <div className="flex flex-col items-center text-center py-4">
        {stepsCompleted > 0 && (
          <div className="flex items-center gap-2 mb-6">
            {stepsCompleted >= 1 && (
              <>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-grip-teal flex items-center justify-center">
                    <CheckCircle size={12} className="text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-grip-teal">DigiLocker</span>
                </div>
                <div className="w-6 h-0.5 bg-grip-border" />
              </>
            )}
            {stepsCompleted >= 2 && (
              <>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-grip-teal flex items-center justify-center">
                    <CheckCircle size={12} className="text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-grip-teal">Selfie</span>
                </div>
                <div className="w-6 h-0.5 bg-grip-border" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-grip-navy flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground">{stepsCompleted + 1}</span>
              </div>
              <span className="text-xs font-semibold text-foreground">E-Sign</span>
            </div>
          </div>
        )}

        <div className="w-14 h-14 rounded-full bg-grip-bg flex items-center justify-center mb-4">
          <FileText size={24} className="text-grip-navy" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Review and sign your AOF to open a lifetime free demat account.
        </p>

        <button onClick={onSubmit} className="grip-cta active:scale-[0.98] transition-transform">
          E-Sign & Submit
        </button>
      </div>
    </div>
  );
}

/* ── Success Screen ── */
function SuccessScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="px-5 pb-6 pt-2">
      <div className="flex flex-col items-center py-10">
        <div className="w-16 h-16 rounded-full bg-grip-teal/15 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-grip-teal" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">Congratulations!</h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Your Demat account with Grip has been opened.
        </p>
      </div>
      <button onClick={onDone} className="grip-cta-teal active:scale-[0.98] transition-transform">
        Continue to Invest
      </button>
    </div>
  );
}
