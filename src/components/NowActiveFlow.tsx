import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Loader2, XCircle } from "lucide-react";

interface Props {
  onBack: () => void;
  onDone: () => void;
  onSwitchToGripDP: () => void;
  onSwitchToAddDP: () => void;
  isActive: boolean;
}

type Step = "loading" | "active" | "inactive";

export default function NowActiveFlow({ onBack, onDone, onSwitchToGripDP, onSwitchToAddDP, isActive }: Props) {
  const [step, setStep] = useState<Step>("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(isActive ? "active" : "inactive");
    }, 2000);
    return () => clearTimeout(timer);
  }, [isActive]);

  if (step === "loading") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h2 className="text-base font-bold text-foreground">Now It Is Active</h2>
        </div>
        <div className="flex flex-col items-center py-16">
          <Loader2 size={40} className="text-grip-navy animate-spin mb-4" />
          <p className="text-sm font-semibold text-foreground">Verifying your Demat status…</p>
          <p className="text-xs text-muted-foreground mt-1">Checking with NSDL/CDSL</p>
        </div>
      </div>
    );
  }

  if (step === "active") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full bg-grip-teal/15 flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-grip-teal" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Demat Re-verified!</h2>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Your Demat account has been confirmed as active. You can now invest in bonds.
          </p>
        </div>
        <button onClick={onDone} className="grip-cta-teal active:scale-[0.98] transition-transform">
          Invest Now
        </button>
      </div>
    );
  }

  // inactive
  return (
    <div className="px-5 pb-6 pt-2">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="text-base font-bold text-foreground">Now It Is Active</h2>
      </div>

      <div className="flex flex-col items-center text-center py-6">
        <div className="w-14 h-14 rounded-full bg-grip-red/15 flex items-center justify-center mb-4">
          <XCircle size={28} className="text-grip-red" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">
          Your Demat is still inactive
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          We checked with NSDL/CDSL and your Demat account is still showing as inactive. You can try one of the options below.
        </p>

        <div className="w-full space-y-3">
          <button onClick={onSwitchToGripDP} className="grip-cta active:scale-[0.98] transition-transform">
            Open Grip DP
          </button>
          <button onClick={onSwitchToAddDP} className="grip-cta-outline active:scale-[0.98] transition-transform">
            Add Another DP Account
          </button>
        </div>
      </div>
    </div>
  );
}
