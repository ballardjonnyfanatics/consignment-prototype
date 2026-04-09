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

  const grader = GRADERS.find((g) => g.id === state.selectedGrader);
  const tier = grader?.tiers.find((t) => t.id === state.selectedTier);

  const submissionType =
    state.cardCondition === "raw" ? "Authenticate & Vault" : "Submit to Vault";

  const listingLabel =
    state.listingIntent === "weekly-auction"
      ? "Weekly Auction"
      : state.listingIntent === "premier-auction"
        ? "Premier Auction"
        : state.listingIntent === "vault"
          ? "Store in Vault"
          : null;

  const estimatedFee = state.itemCount * (tier ? parseFloat(tier.price.replace(/[^0-9.]/g, "")) : 0);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold leading-6">Review your submission</h3>

      <div className="flex flex-col gap-1 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
        <SummaryRow label="Submission type" value={submissionType} />
        {grader && <SummaryRow label="Grading company" value={grader.name} />}
        {tier && <SummaryRow label="Service tier" value={tier.name} />}
        <SummaryRow label="Number of items" value={String(state.itemCount)} />
        <SummaryRow
          label="Estimated total value"
          value={`$${state.estimatedValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        />
      </div>

      {estimatedFee > 0 && (
        <div className="flex items-baseline justify-between rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold">Estimated grading fee</span>
            <span className="text-xs text-[var(--ds1-main-text-secondary)]">
              Payable once your submission is complete.
            </span>
          </div>
          <span className="text-sm font-bold">
            ${estimatedFee.toFixed(2)}
          </span>
        </div>
      )}

      {listingLabel && (
        <div className="flex items-baseline justify-between rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
          <span className="text-sm text-[var(--ds1-main-text-secondary)]">
            After authentication
          </span>
          <span className="text-sm font-bold">{listingLabel}</span>
        </div>
      )}

      <div className="flex gap-2 rounded-xl bg-[var(--ds1-main-bg-fill-info-subtle)] p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds1-main-text-info)]" />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold">Processing fees may apply</span>
          <span className="text-xs text-[var(--ds1-main-text-secondary)]">
            Please note items valued under $50 may incur a one-time processing
            fee of $3 if they are not sold within 30 days.
          </span>
        </div>
      </div>
    </div>
  );
}
