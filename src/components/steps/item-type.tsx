"use client";

import * as React from "react";
import { Info } from "lucide-react";
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
        "flex w-full items-start gap-2.5 rounded-lg border-1 px-3 py-3 text-left transition-colors",
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
    <div className="flex flex-col gap-3 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
      <p className="text-sm font-bold text-[var(--ds1-main-text-primary)]">We accept...</p>
      <div className="h-px bg-[var(--ds1-main-divider-primary)]" />
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex gap-2">
          <span className="shrink-0">✅</span>
          <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Comics</span> <span className="text-[var(--ds1-main-text-secondary)]">— CGC, CBCS</span></p>
        </div>
        <div className="flex gap-2">
          <span className="shrink-0">✅</span>
          <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Video games</span> <span className="text-[var(--ds1-main-text-secondary)]">— WATA, CGC</span></p>
        </div>
        <div className="flex gap-2">
          <span className="shrink-0">✅</span>
          <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Oversize slabs</span> <span className="text-[var(--ds1-main-text-secondary)]">— PSA, BGS, CGC, CBCS, WATA, VGA</span></p>
        </div>
        <div className="flex gap-2">
          <span className="shrink-0">✅</span>
          <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Wax</span> <span className="text-[var(--ds1-main-text-secondary)]">— BBCE, GAI, PSA, factory sealed</span></p>
        </div>
        <div className="flex gap-2">
          <span className="shrink-0">✅</span>
          <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Small memorabilia</span> <span className="text-[var(--ds1-main-text-secondary)]">— UDA, Steiner, Fanatics Authentic, etc.</span></p>
        </div>
      </div>
    </div>
  ),
  "large-items": (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-3 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
        <p className="text-sm font-bold text-[var(--ds1-main-text-primary)]">We accept...</p>
        <div className="h-px bg-[var(--ds1-main-divider-primary)]" />
        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex gap-2">
            <span className="shrink-0">✅</span>
            <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Wax cases</span> <span className="text-[var(--ds1-main-text-secondary)]">— BBCE, factory sealed sports cases</span></p>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0">✅</span>
            <p><span className="font-bold text-[var(--ds1-main-text-primary)]">Memorabilia</span> <span className="text-[var(--ds1-main-text-secondary)]">— MeiGray, Resolution, Davious, RGU, Fanatics Authentic, or any other reputable third party authenticators</span></p>
          </div>
        </div>
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
