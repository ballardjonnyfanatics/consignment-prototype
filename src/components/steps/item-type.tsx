"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";
import { ITEM_CATEGORIES } from "@/lib/submission-types";

function RadioCard({
  selected,
  onSelect,
  label,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-2.5 rounded-lg border px-3 py-3 text-left transition-colors",
        selected
          ? "border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-layer-1)]"
          : "border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] hover:border-[var(--ds1-main-border-primary-hover)]"
      )}
    >
      <div className="flex items-center pt-0.5">
        <div
          className={cn(
            "h-5 w-5 shrink-0 rounded-full border-2 transition-colors",
            selected
              ? "border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-fill)]"
              : "border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)]"
          )}
        >
          {selected && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[var(--ds1-main-bg-fill-inverse)]" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-bold leading-6">{label}</span>
        {description && (
          <span className="text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
            {description}
          </span>
        )}
      </div>
    </button>
  );
}

const ELIGIBILITY_INFO: Record<string, React.ReactNode> = {
  "comics-collectibles": (
    <div className="flex flex-col gap-3 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4 text-sm">
      <p className="font-bold">We accept items from:</p>
      <div className="flex flex-col gap-2 text-[var(--ds1-main-text-secondary)]">
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Comics</span><br />CGC, CBCS</div>
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Video games</span><br />WATA, CGC</div>
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Oversize slabbed items</span><br />PSA, BGS, CGC, CBCS, WATA, VGA</div>
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Vintage & modern wax</span><br />BBCE, GAI, PSA, and factory sealed modern sports wax</div>
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Small memorabilia</span><br />Baseballs, pucks, and other small items from UDA, Steiner, Fanatics Authentic, or other reputable authenticator</div>
      </div>
    </div>
  ),
  "large-items": (
    <div className="flex flex-col gap-3 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4 text-sm">
      <div className="flex items-start gap-2 rounded-lg bg-[var(--ds1-main-bg-fill-warning-subtle)] p-3">
        <span className="text-base">&#9888;&#65039;</span>
        <div>
          <p className="font-bold text-[var(--ds1-main-text-primary)]">Pre-approval required</p>
          <p className="text-[var(--ds1-main-text-secondary)]">Large items must be approved before submission. Chat with us to get started.</p>
        </div>
      </div>
      <p className="font-bold">We accept:</p>
      <div className="flex flex-col gap-2 text-[var(--ds1-main-text-secondary)]">
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Memorabilia</span><br />MeiGray, Resolution, Davious, RGU, Fanatics Authentic, or other reputable authenticator</div>
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Wax cases</span><br />BBCE and factory sealed sports cases</div>
        <div><span className="font-bold text-[var(--ds1-main-text-primary)]">Other larger items</span><br />By approval only</div>
      </div>
    </div>
  ),
};

export function ItemTypeStep() {
  const { state, setItemCategory, setCardCondition } = useWizard();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-6">
          What are you submitting?
        </h3>
        <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
          This determines the steps and pricing.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {ITEM_CATEGORIES.map((cat) => (
          <React.Fragment key={cat.id}>
            <RadioCard
              selected={state.itemCategory === cat.id}
              onSelect={() => setItemCategory(cat.id)}
              label={cat.label}
              description={cat.description}
            />
            {state.itemCategory === cat.id &&
              ELIGIBILITY_INFO[cat.id] &&
              ELIGIBILITY_INFO[cat.id]}
          </React.Fragment>
        ))}
      </div>

      {state.itemCategory === "trading-cards" && (
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold leading-6">
              What condition are they in?
            </h3>
            <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
              This determines your authentication options and pricing.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <RadioCard
              selected={state.cardCondition === "raw"}
              onSelect={() => setCardCondition("raw")}
              label="Raw (ungraded)"
              description="Get them authenticated"
            />
            <RadioCard
              selected={state.cardCondition === "graded"}
              onSelect={() => setCardCondition("graded")}
              label="Already graded or authenticated"
              description="Add to your vault"
            />
          </div>
        </div>
      )}
    </div>
  );
}
