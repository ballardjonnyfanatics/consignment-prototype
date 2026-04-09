"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";
import { GRADERS } from "@/lib/submission-types";

export function GraderStep() {
  const { state, setGrader, setTier } = useWizard();
  const [expandedGrader, setExpandedGrader] = React.useState<string | null>(
    null
  );

  function handleGraderClick(graderId: string) {
    if (expandedGrader === graderId) {
      setExpandedGrader(null);
    } else {
      setExpandedGrader(graderId);
      setGrader(graderId);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold leading-6">
          Select a grading company
        </h3>
        <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
          All raw items in your submission must be authenticated. Please select a
          service for these items.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {GRADERS.map((grader) => {
          const isExpanded = expandedGrader === grader.id;
          const isSelected = state.selectedGrader === grader.id;

          return (
            <div
              key={grader.id}
              className={cn(
                "overflow-hidden rounded-lg border transition-colors",
                isSelected
                  ? "border-[var(--ds1-main-border-primary-active)]"
                  : "border-[var(--ds1-main-border-primary)]"
              )}
            >
              <button
                onClick={() => handleGraderClick(grader.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
              >
                <div className="flex flex-col">
                  <span className="text-base font-bold">{grader.name}</span>
                  <span className="text-sm text-[var(--ds1-main-text-secondary)]">
                    From {grader.startingPrice} &middot; {grader.turnaround}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-[var(--ds1-main-icon-secondary)]" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-[var(--ds1-main-icon-secondary)]" />
                )}
              </button>

              {isExpanded && (
                <div className="flex flex-col gap-2 border-t border-[var(--ds1-main-divider-primary)] p-4 pt-3">
                  {grader.tiers.map((tier) => {
                    const tierSelected = state.selectedTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setTier(tier.id)}
                        className={cn(
                          "flex w-full items-start gap-2 rounded-lg p-3 text-left transition-colors",
                          tierSelected
                            ? "bg-[var(--ds1-main-bg-fill-alpha)]"
                            : "hover:bg-[var(--ds1-main-bg-fill-alpha)]"
                        )}
                      >
                        <div className="flex items-center pt-0.5">
                          <div
                            className={cn(
                              "h-4 w-4 shrink-0 rounded-full border transition-colors",
                              tierSelected
                                ? "border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-fill)]"
                                : "border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)]"
                            )}
                          >
                            {tierSelected && (
                              <div className="flex h-full w-full items-center justify-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--ds1-main-bg-fill-inverse)]" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                          <span className="text-sm font-bold">{tier.name}</span>
                          <span className="text-xs text-[var(--ds1-main-text-secondary)]">
                            {tier.businessDays}
                          </span>
                          <span className="text-xs text-[var(--ds1-main-text-secondary)]">
                            {tier.description}
                          </span>
                        </div>
                        <span className="shrink-0 text-xs font-bold">
                          {tier.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
