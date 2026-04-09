"use client";

import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";
import { LISTING_OPTIONS, type ListingIntent } from "@/lib/submission-types";

export function ListingIntentStep() {
  const { state, setListingIntent } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold leading-6">
        What would you like to happen next?
      </h3>

      <div className="flex flex-col gap-3">
        {LISTING_OPTIONS.map((opt) => {
          const selected = state.listingIntent === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setListingIntent(opt.id as ListingIntent)}
              className={cn(
                "flex w-full items-start gap-2.5 rounded-lg text-left transition-colors",
                selected
                  ? "border-2 px-[11px] py-[11px] border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-layer-1)]"
                  : "border px-3 py-3 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] hover:border-[var(--ds1-main-border-primary-hover)]"
              )}
            >
              <div className="flex items-center pt-0.5">
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
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-bold leading-6">
                  {opt.label}
                </span>
                <span className="text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
                  {opt.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
