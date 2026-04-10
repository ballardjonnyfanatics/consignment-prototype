"use client";

import { Info } from "lucide-react";
import { useWizard } from "@/components/wizard/wizard-context";
import { GRADERS } from "@/lib/submission-types";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-0.5">
      <span className="text-sm text-[var(--ds1-main-text-secondary)]">
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

export function ReviewStep() {
  const { state } = useWizard();

  const isRaw = state.cardCondition === "raw";
  const isRedRookie = state.itemCategory === "red-rookie";
  const grader = GRADERS.find((g) => g.id === state.selectedGrader);
  const tier = grader?.tiers.find((t) => t.id === state.selectedTier);

  const hasListing =
    state.listingIntent === "weekly-auction" ||
    state.listingIntent === "premier-auction";

  const listingRoute =
    state.listingIntent === "weekly-auction"
      ? "Weekly Auction"
      : state.listingIntent === "premier-auction"
        ? "Premier Auction"
        : null;

  const tierPrice = tier ? parseFloat(tier.price.replace(/[^0-9.]/g, "")) : 0;
  const estimatedGradingCost = state.itemCount * tierPrice;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold leading-6">Review your submission</h3>
      <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5 rounded-lg bg-[var(--ds1-main-bg-layer-2)] p-4">
        <SummaryRow
          label="Estimated total value"
          value={`$${state.estimatedValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        />
      </div>

      {isRaw && grader && (
        <div className="flex flex-col gap-0.5 rounded-lg bg-[var(--ds1-main-bg-layer-2)] p-4">
          <SummaryRow label="Authenticated by" value={grader.name} />
          {tier && <SummaryRow label="Service" value={tier.name} />}
          {estimatedGradingCost > 0 && (
            <div className="flex items-baseline justify-between py-0.5">
              <div className="flex flex-col">
                <span className="text-sm text-[var(--ds1-main-text-secondary)]">Estimated grading cost</span>
                <span className="text-xs text-[var(--ds1-main-text-secondary)]">Payable once your submission is complete.</span>
              </div>
              <span className="text-sm font-bold">
                ${estimatedGradingCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      )}

      {hasListing && listingRoute && (
        <div className="flex flex-col gap-0.5 rounded-lg bg-[var(--ds1-main-bg-layer-2)] p-4">
          <SummaryRow label="Selling via" value={listingRoute} />
        </div>
      )}

      {state.psaCards.length > 0 && (
        <div className="flex flex-col gap-0.5 rounded-lg bg-[var(--ds1-main-bg-layer-2)] p-4">
          <span className="text-xs font-semibold text-[var(--ds1-main-text-secondary)]">Cards</span>
          {state.psaCards.map((card) => (
            <div key={card.id} className="flex items-baseline justify-between">
              <span className="flex-1 truncate text-sm text-[var(--ds1-main-text-secondary)]">
                {[card.year, card.product, card.player].filter(Boolean).join(" ") || "Untitled card"} {card.quantity > 1 && `(×${card.quantity})`}
              </span>
              <span className="ml-2 shrink-0 text-sm font-bold">
                ${(card.estimatedValue * card.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 rounded-lg bg-[var(--ds1-main-bg-fill-info-subtle)] p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds1-main-icon-primary)]" />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold">Vault fees may apply</span>
          <span className="text-xs text-[var(--ds1-main-text-secondary)]">
            Items valued under $50 may incur a one-time processing
            fee of $3 if they are not sold within 30 days.
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}
