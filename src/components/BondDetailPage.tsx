import { useState } from "react";
import { ArrowLeft, Share2, ArrowRight, Calendar, Minus, Plus, ChevronDown, ShieldCheck, Building2 } from "lucide-react";

interface Props {
  onInvestNow: () => void;
}

export default function BondDetailPage({ onInvestNow }: Props) {
  const [units, setUnits] = useState(2);
  const [showMore, setShowMore] = useState(false);

  const pricePerUnit = 98871;
  const returnPerUnit = 114530;
  const investment = units * pricePerUnit;
  const returns = units * returnPerUnit;

  const formatINR = (n: number) =>
    "₹" + n.toLocaleString("en-IN");

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-4 py-3 bg-card">
        <ArrowLeft size={22} className="text-foreground" />
        <Share2 size={20} className="text-foreground" />
      </div>

      {/* Bond type pill */}
      <div className="flex justify-center py-3">
        <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-grip-border bg-card text-foreground">
          Senior Secured Bond
        </span>
      </div>

      {/* Issuer Card */}
      <div className="mx-4 grip-card p-5">
        {/* Issuer header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎇</span>
            <span className="font-bold text-base text-foreground">Spandana</span>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-grip-yellow text-foreground">
            BBB+ (Moderate Risk)
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-5">13% YTM • 27 M</p>

        {/* Investment → Returns */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Investment</p>
            <p className="text-base font-semibold text-foreground border-b border-dashed border-foreground/40">
              {formatINR(investment)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-grip-teal/15 flex items-center justify-center">
            <ArrowRight size={16} className="text-grip-teal" />
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Returns</p>
            <p className="text-base font-semibold text-grip-teal border-b border-dashed border-grip-teal/50">
              {formatINR(returns)}
            </p>
          </div>
        </div>

        {/* Unit selector */}
        <div className="flex items-center justify-between border border-grip-border rounded-xl px-4 py-3 mb-4">
          <div>
            <p className="text-2xl font-bold text-foreground leading-none">{units}</p>
            <p className="text-xs font-medium text-grip-teal mt-0.5">units</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUnits(Math.max(1, units - 1))}
              className="w-10 h-10 rounded-lg bg-grip-bg flex items-center justify-center active:scale-95 transition-transform"
            >
              <Minus size={16} className="text-foreground" />
            </button>
            <button
              onClick={() => setUnits(units + 1)}
              className="w-10 h-10 rounded-lg bg-grip-navy flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus size={16} className="text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Preset chips */}
        <div className="flex items-end justify-center gap-3 mb-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center">
              {n === 2 && (
                <span className="mb-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-grip-yellow text-foreground">
                  Popular
                </span>
              )}
              <button
                onClick={() => setUnits(n)}
                className={`px-5 py-2 rounded-full text-xs font-medium border transition-colors active:scale-95 ${
                  units === n
                    ? "border-grip-navy bg-grip-navy/5 text-foreground"
                    : "border-grip-border text-muted-foreground"
                }`}
              >
                {n} unit{n > 1 ? "s" : ""}
              </button>
            </div>
          ))}
        </div>

        {/* View Returns */}
        <button className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-foreground mb-4">
          <Calendar size={16} className="text-foreground" />
          View Returns
        </button>

        {/* Trust chips */}
        <div className="flex items-center justify-center gap-2">
          <span className="grip-pill">
            <ShieldCheck size={13} className="text-grip-teal" />
            Sell Anytime
          </span>
          <span className="grip-pill">
            <Building2 size={13} className="text-grip-navy" />
            Public Listed Company
          </span>
        </div>
      </div>

      {/* Reasons to Invest */}
      <div className="mx-4 mt-6">
        <p className="grip-section-label mb-3">REASONS TO INVEST</p>
        <div className="grip-card p-5">
          <ul className="space-y-3 text-sm text-foreground leading-relaxed">
            <li className="flex gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
              <span>
                Marquee private equity investor, <strong>Kedaara Capital has 48.2% shareholding</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
              <span>
                Strong capital base with <strong>Net-Worth of INR 2,227 Cr and CRAR of 47%</strong>. Raised INR 200 Cr in Aug'25 in equity from Promoters
              </span>
            </li>
            {showMore && (
              <>
                <li className="flex gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                  <span>
                    Low leverage with <strong>Debt to Equity ratio of 2.8x</strong> compared to industry average of 4x
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                  <span>
                    <strong>Diversified loan book</strong> across 18 states with no single state contributing more than 15%
                  </span>
                </li>
              </>
            )}
          </ul>
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center justify-center gap-1 w-full pt-3 text-sm font-medium text-muted-foreground"
          >
            {showMore ? "See less" : "See more"}
            <ChevronDown size={16} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-grip-border">
        <button onClick={onInvestNow} className="grip-cta active:scale-[0.98] transition-transform">
          Invest Now
        </button>
      </div>
    </div>
  );
}
