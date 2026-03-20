import { ChevronDown } from "lucide-react";

export type Scenario = "bond-detail" | "open-grip-dp" | "add-another-dp" | "now-active";

const labels: Record<Scenario, string> = {
  "bond-detail": "Inactive Demat Trigger",
  "open-grip-dp": "Open Grip DP",
  "add-another-dp": "Add Another DP",
  "now-active": "Now It Is Active",
};

interface Props {
  current: Scenario;
  onChange: (s: Scenario) => void;
}

export default function ScenarioSwitcher({ current, onChange }: Props) {
  return (
    <div className="sticky top-0 z-50 flex items-center gap-2 px-4 py-2 bg-grip-navy">
      <span className="text-xs font-medium text-primary-foreground whitespace-nowrap">🔬 Prototype</span>
      <div className="relative flex-1">
        <select
          value={current}
          onChange={(e) => onChange(e.target.value as Scenario)}
          className="w-full appearance-none rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 pr-8 text-xs font-medium text-primary-foreground outline-none"
        >
          {Object.entries(labels).map(([key, label]) => (
            <option key={key} value={key} className="text-foreground bg-card">
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground" size={14} />
      </div>
    </div>
  );
}
