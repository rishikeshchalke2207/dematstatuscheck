import { ArrowLeft, ExternalLink } from "lucide-react";

interface Props {
  onBack: () => void;
}

export default function AddAnotherDPFlow({ onBack }: Props) {
  return (
    <div className="px-5 pb-6 pt-2">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="text-base font-bold text-foreground">Add Another DP Account</h2>
      </div>

      <div className="flex flex-col items-center text-center py-6">
        <div className="w-14 h-14 rounded-full bg-grip-bg flex items-center justify-center mb-4">
          <ExternalLink size={24} className="text-foreground" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">
          You will be redirected to sign the Demat modification form
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Fill in your new Demat details on the form. Once submitted, our team will verify your details within 1–2 business days.
        </p>

        <a
          href="https://forms.zohopublic.in/GripBroking/form/DematUpdateDetails/formperma/J0uApQ8Cv4JpEFlj4LxdZ5xELdfoWtJD3M3Ump_X72U"
          target="_blank"
          rel="noopener noreferrer"
          className="grip-cta active:scale-[0.98] transition-transform block"
        >
          Open Form →
        </a>

        <button onClick={onBack} className="mt-4 text-sm font-medium text-muted-foreground active:scale-95 transition-transform">
          ← Back
        </button>
      </div>
    </div>
  );
}
