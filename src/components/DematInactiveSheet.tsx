import { AlertTriangle, Building2, Plus, CheckCircle, ChevronRight } from "lucide-react";

interface Props {
  onOpenGripDP: () => void;
  onAddAnotherDP: () => void;
  onNowActive: () => void;
  onMaybeLater: () => void;
}

const options = [
  {
    key: "grip-dp",
    icon: <Building2 size={20} className="text-grip-navy" />,
    title: "Open a Grip Demat Account",
    desc: "Open a lifetime free demat account with Grip",
  },
  {
    key: "add-dp",
    icon: <Plus size={20} className="text-grip-navy" />,
    title: "Add Another Demat Account",
    desc: "Link a different active Demat you already own",
  },
  {
    key: "now-active",
    icon: <CheckCircle size={20} className="text-grip-teal" />,
    title: "My Demat is now Active",
    desc: "My Demat is now active — verify and proceed",
  },
];

export default function DematInactiveSheet({ onOpenGripDP, onAddAnotherDP, onNowActive, onMaybeLater }: Props) {
  const handlers: Record<string, () => void> = {
    "grip-dp": onOpenGripDP,
    "add-dp": onAddAnotherDP,
    "now-active": onNowActive,
  };

  return (
    <div className="px-5 pb-6 pt-2">
      <div className="flex flex-col items-center mb-5">
        <div className="w-12 h-12 rounded-full bg-grip-amber/15 flex items-center justify-center mb-3">
          <AlertTriangle size={24} className="text-grip-amber" />
        </div>
        <h2 className="text-lg font-bold text-foreground text-center">Your Demat Account is Inactive</h2>
        <p className="text-sm text-muted-foreground text-center mt-1">
          To invest in this bond, you need an active Demat account.
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={handlers[opt.key]}
            className="w-full flex items-center gap-3 p-4 grip-card text-left active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-grip-bg flex items-center justify-center shrink-0">
              {opt.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{opt.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      <button onClick={onMaybeLater} className="grip-cta-outline active:scale-[0.98] transition-transform">
        Maybe Later
      </button>
    </div>
  );
}
