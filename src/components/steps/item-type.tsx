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
        "flex w-full items-start gap-2.5 rounded-lg text-left transition-colors",
        selected
          ? "border-2 px-[11px] py-[11px] border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-layer-1)]"
          : "border px-3 py-3 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] hover:border-[var(--ds1-main-border-primary-hover)]"
      )}
    >
      <div className="flex items-center pt-1">
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded-full border transition-colors",
            selected
              ? "border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-fill)]"
              : "border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)]"
          )}
        >
          {selected && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--ds1-main-bg-fill-inverse)]" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
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

function EligibilityItem({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex gap-2">
      <span className="shrink-0">✅</span>
      <p><span className="font-bold text-[var(--ds1-main-text-primary)]">{label}</span> <span className="text-[var(--ds1-main-text-secondary)]"> {detail}</span></p>
    </div>
  );
}

const ELIGIBILITY_INFO: Record<string, React.ReactNode> = {
  "comics-collectibles": (
    <div className="flex flex-col gap-2 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4 text-xs">
      <span className="text-xs text-[var(--ds1-main-text-secondary)]">Accepted authenticators</span>
      <div className="flex flex-col gap-1.5">
        <EligibilityItem label="Comics:" detail="CGC, CBCS" />
        <EligibilityItem label="Video games:" detail="WATA, CGC" />
        <EligibilityItem label="Oversize slabs:" detail="PSA, BGS, CGC, CBCS, WATA, VGA" />
        <EligibilityItem label="Wax:" detail="BBCE, GAI, PSA, factory sealed" />
        <EligibilityItem label="Small memorabilia:" detail="UDA, Steiner, Fanatics Authentic, etc." />
      </div>
    </div>
  ),
  "large-items": (
    <div className="flex flex-col gap-2 rounded-lg bg-[var(--ds1-main-bg-layer-2)] p-3 text-xs">
      <span className="text-xs text-[var(--ds1-main-text-secondary)]">Accepted authenticators</span>
      <div className="flex flex-col gap-1.5">
        <EligibilityItem label="Wax cases:" detail="BBCE, factory sealed sports cases" />
        <EligibilityItem label="Memorabilia:" detail="MeiGray, Resolution, Davious, RGU, Fanatics Authentic, or any other reputable third party authenticators" />
      </div>
    </div>
  ),
};

export function ItemTypeStep() {
  const { state, setItemCategory } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-6">
          What are you submitting?
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {ITEM_CATEGORIES.map((cat) => {
          const isSelected = state.itemCategory === cat.id;
          const hasInfo = isSelected && ELIGIBILITY_INFO[cat.id];
          return (
            <div key={cat.id} className={hasInfo ? "flex flex-col gap-2" : ""}>
              <RadioCard
                selected={isSelected}
                onSelect={() => setItemCategory(cat.id)}
                label={cat.label}
                description={cat.description}
              />
              {hasInfo && ELIGIBILITY_INFO[cat.id]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
