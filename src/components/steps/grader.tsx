"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";
import { GRADERS } from "@/lib/submission-types";
import { InfoIcon } from "lucide-react";

const GRADER_LOGOS: Record<string, string> = {
  beckett: "/logos/beckett.svg",
  cgc: "/logos/cgc.png",
  psa: "/logos/psa.svg",
  sgc: "/logos/sgc.svg",
};

export function GraderStep() {
  const { state, updateState } = useWizard();
  const [expandedGrader, setExpandedGrader] = React.useState<string | null>(null);

  function handleAccordionClick(graderId: string) {
    if (expandedGrader === graderId) {
      setExpandedGrader(null);
    } else {
      setExpandedGrader(graderId);
    }
  }

  function handleTierSelect(graderId: string, tierId: string) {
    const graderChanged = state.selectedGrader !== graderId;
    updateState({
      selectedGrader: graderId,
      selectedTier: tierId,
      ...(graderChanged && { gradingType: "card" as const, psaCards: [], itemCount: 0, estimatedValue: 0 }),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-6">
          Choose an authentication service
        </h3>
        <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
          All items must be authenticated before they can be stored in the Vault.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {GRADERS.map((grader) => {
          const isSelected = state.selectedGrader === grader.id;
          const isOpen = expandedGrader === grader.id;

              return (
                <div
                  key={grader.id}
                  className="flex flex-col rounded-lg border border-[var(--ds1-main-divider-primary)]"
                >
                  <button
                    onClick={() => handleAccordionClick(grader.id)}
                    className={cn(
                      "flex items-center justify-between p-4 text-left",
                      isOpen && "border-b border-[var(--ds1-main-divider-primary)]"
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        {GRADER_LOGOS[grader.id] ? (
                          <img
                            src={GRADER_LOGOS[grader.id]}
                            alt={grader.name}
                            className="h-6 w-auto max-w-[64px] shrink-0"
                          />
                        ) : (
                          <span className="text-xs font-bold">{grader.name}</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-0">
                      {grader.tagline && (
                        <span className="text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
                          {grader.tagline} From <span className="font-bold text-[var(--ds1-main-text-primary)]">{grader.startingPrice}/card</span>
                        </span>
                      )}
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-[var(--ds1-main-icon-secondary)] transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-out",
                      isOpen
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="p-2">
                      {grader.id === "psa" ? (
                        <>
                          <div className="flex items-center gap-3 px-2">
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] tracking-wide text-[var(--ds1-main-text-secondary)]">Service</span>
                            </div>
                            <div className="flex items-baseline gap-2 shrink-0 text-right">
                              <span className="w-[6rem] text-[10px] tracking-wide text-[var(--ds1-main-text-secondary)] whitespace-nowrap text-right">Card value</span>
                              <span className="w-[4rem] text-[10px] tracking-wide text-[var(--ds1-main-text-secondary)] whitespace-nowrap text-right">Turnaround</span>
                              <span className="w-[5rem] text-[10px] tracking-wide text-[var(--ds1-main-text-secondary)] whitespace-nowrap text-right">Fee per card</span>
                            </div>
                          </div>
                          {grader.tiers.map((tier) => {
                            const tierSelected =
                              state.selectedGrader === grader.id &&
                              state.selectedTier === tier.id;
                            return (
                              <button
                                key={tier.id}
                                onClick={() => handleTierSelect(grader.id, tier.id)}
                                className={cn(
                                  "flex w-full items-center gap-3 py-2 text-left transition-colors rounded-lg px-2",
                                  tierSelected
                                    ? "bg-[var(--ds1-main-bg-fill-alpha)]"
                                    : "hover:bg-[var(--ds1-main-bg-fill-alpha)]"
                                )}
                              >
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
                                <div className="flex flex-1 min-w-0 items-baseline gap-1.5">
                                  <span className="text-xs font-semibold truncate">{tier.name}</span>
                                </div>
                                <div className="flex items-baseline gap-2 shrink-0 text-right">
                                  <span className="w-[6rem] text-xs text-[var(--ds1-main-text-secondary)] whitespace-nowrap text-right">
                                    {tier.maxValue || ""}
                                  </span>
                                  <span className="w-[4rem] text-xs text-[var(--ds1-main-text-secondary)] whitespace-nowrap text-right">
                                    {tier.businessDays || ""}
                                  </span>
                                  <span className="w-[5rem] text-xs font-bold whitespace-nowrap text-right">
                                    {tier.price}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </>
                      ) : (
                        <div className="flex flex-col">
                          {grader.tiers.map((tier) => {
                            const tierSelected =
                              state.selectedGrader === grader.id &&
                              state.selectedTier === tier.id;
                            const details = [
                              tier.maxValue,
                              tier.businessDays,
                              tier.description,
                            ].filter(Boolean).join(" · ");
                            return (
                              <button
                                key={tier.id}
                                onClick={() => handleTierSelect(grader.id, tier.id)}
                                className={cn(
                                  "flex w-full items-start gap-2 text-left transition-colors rounded-lg p-2",
                                  tierSelected
                                    ? "bg-[var(--ds1-main-bg-fill-alpha)]"
                                    : "hover:bg-[var(--ds1-main-bg-fill-alpha)]"
                                )}
                              >
                                <div
                                  className={cn(
                                    "mt-0.5 h-4 w-4 shrink-0 rounded-full border transition-colors",
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
                                <div className="flex flex-1 min-w-0 flex-col">
                                  <span className="text-sm font-bold">{tier.name}</span>
                                  <span className="text-[11px] leading-4 text-[var(--ds1-main-text-secondary)]">
                                    {details}
                                  </span>
                                </div>
                                <span className="text-xs font-bold whitespace-nowrap shrink-0">
                                  {tier.price}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
}
