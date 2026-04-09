"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";
import { GRADERS } from "@/lib/submission-types";

function RadioCard({
  selected,
  onSelect,
  label,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description?: string | null;
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

export function GraderStep() {
  const { state, setCardCondition, setGrader, setTier } = useWizard();
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-bold leading-6">
            What condition are your cards in?
          </h3>
        </div>

        <div className="flex flex-col gap-3">
        <RadioCard
            selected={state.cardCondition === "graded"}
            onSelect={() => setCardCondition("graded")}
            label="Graded or authenticated"
          />
          <RadioCard
            selected={state.cardCondition === "raw"}
            onSelect={() => setCardCondition("raw")}
            label="Raw (ungraded)"
          />
        </div>
      </div>

      {state.cardCondition === "raw" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold leading-6">
              Select a grading company
            </h3>
            <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
              All items must be authenticated before they can be stored in the
              Vault. Choose a grading company for your raw cards.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {GRADERS.map((grader) => {
              const isExpanded = expandedGrader === grader.id;
              const isSelected = state.selectedGrader === grader.id;

              return (
                <div
                  key={grader.id}
                  className={cn(
                    "overflow-hidden rounded-lg border-1 bg-[var(--ds1-main-input-bg-fill)] border-[var(--ds1-main-border-primary)] transition-colors"
                  )}
                >
                  <button
                    onClick={() => handleGraderClick(grader.id)}
                    className="flex w-full items-center justify-between p-3 text-left"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{grader.name}</span>
                      <span className="text-xs text-[var(--ds1-main-text-secondary)]">
                        From {grader.startingPrice} &middot;{" "}
                        {grader.turnaround}
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
                        const tierSelected =
                          state.selectedTier === tier.id;
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
                              <span className="text-sm font-bold">
                                {tier.name}
                              </span>
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
      )}
    </div>
  );
}
