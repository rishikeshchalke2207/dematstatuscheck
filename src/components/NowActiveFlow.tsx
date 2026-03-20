import { useState } from "react";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  onBack: () => void;
  onDone: () => void;
  onSwitchToGripDP: () => void;
  onSwitchToAddDP: () => void;
}

type Status = "pending" | "active" | "inactive";
type Step = "main" | "success";

export default function NowActiveFlow({ onBack, onDone, onSwitchToGripDP, onSwitchToAddDP }: Props) {
  const [status, setStatus] = useState<Status>("pending");
  const [step, setStep] = useState<Step>("main");

  if (step === "success") {
    return (
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full bg-grip-teal/15 flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-grip-teal" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">UCC Activated!</h2>
          <p className="text-sm text-muted-foreground text-center">You can now invest in bonds.</p>
        </div>
        <button onClick={onDone} className="grip-cta-teal active:scale-[0.98] transition-transform">
          Invest Now
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-6 pt-2">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="text-base font-bold text-foreground">Now It Is Active</h2>
      </div>

      {/* Demat details */}
      <div className="rounded-xl bg-grip-bg p-4 mb-4 space-y-2">
        <p className="text-xs text-muted-foreground mb-2">Current Demat Details on File</p>
        {[
          ["DP ID", "IN302201"],
          ["Client ID", "10847623"],
          ["Depository", "NSDL"],
          ["PAN", "ABCDE1234F"],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-xs font-semibold text-foreground">{val}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        We'll verify your Demat status live against NSDL/CDSL.
      </p>

      {/* Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-grip-border mb-5">
        <button
          onClick={() => setStatus("active")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            status === "active" ? "bg-grip-navy text-primary-foreground" : "bg-card text-foreground"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setStatus("inactive")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            status === "inactive" ? "bg-grip-navy text-primary-foreground" : "bg-card text-foreground"
          }`}
        >
          Still Inactive
        </button>
      </div>

      {status === "active" && (
        <>
          <div className="rounded-xl bg-grip-teal/10 border border-grip-teal/20 p-4 mb-5">
            <p className="text-sm text-foreground">
              <strong>Demat confirmed active</strong> via NSDL/CDSL. UCC will be marked active in CBRICS.
            </p>
          </div>
          <button onClick={() => setStep("success")} className="grip-cta-teal active:scale-[0.98] transition-transform">
            Activate UCC & Invest →
          </button>
        </>
      )}

      {status === "inactive" && (
        <>
          <div className="rounded-xl bg-grip-red/10 border border-grip-red/20 p-4 mb-4">
            <p className="text-sm text-foreground">
              <strong>Your Demat is still showing as inactive.</strong>
            </p>
          </div>
          <div className="rounded-xl bg-grip-amber/10 border border-grip-amber/20 p-4 mb-5">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-grip-amber shrink-0 mt-0.5" />
              <p className="text-xs text-foreground">
                You cannot re-attempt "Now it is active" on the same day. Please try again tomorrow.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={onSwitchToGripDP} className="grip-cta-outline active:scale-[0.98] transition-transform">
              Open Grip DP Instead
            </button>
            <button onClick={onSwitchToAddDP} className="grip-cta-outline active:scale-[0.98] transition-transform">
              Add Another DP Instead
            </button>
          </div>
        </>
      )}
    </div>
  );
}
