"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";
import { GRADERS, type ServiceTier } from "@/lib/submission-types";

const GRADER_LOGOS: Record<string, string> = {
  beckett: "/logos/beckett.svg",
  cgc: "/logos/cgc.png",
  psa: "/logos/psa.svg",
  sgc: "/logos/sgc.svg",
};

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
        "flex w-full min-h-14 items-center gap-2.5 rounded-lg text-left transition-colors",
        selected
          ? "border-2 px-[11px] py-[11px] border-[var(--ds1-main-border-primary-active)] bg-[var(--ds1-main-bg-layer-1)]"
          : "border px-3 py-3 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] hover:border-[var(--ds1-main-border-primary-hover)]"
      )}
    >
      <div className="flex items-center">
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
        <span className="text-base leading-6">{label}</span>
        {description && (
          <span className="text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
            {description}
          </span>
        )}
      </div>
    </button>
  );
}

function TierTable({
  tiers,
  selectedTier,
  onSelect,
}: {
  tiers: ServiceTier[];
  selectedTier: string | null;
  onSelect: (id: string) => void;
}) {
  let lastGroup: string | undefined;

  return (
    <div className="flex flex-col">
      {tiers.map((tier) => {
        const showGroupHeader = tier.group && tier.group !== lastGroup;
        lastGroup = tier.group;
        const tierSelected = selectedTier === tier.id;

        return (
          <React.Fragment key={tier.id}>
            {showGroupHeader && (
              <div className="px-3 pt-2 pb-2">
                <span className="text-xs text-[var(--ds1-main-text-secondary)]">
                  {tier.group}
                </span>
              </div>
            )}
            <button
              onClick={() => onSelect(tier.id)}
              className={cn(
                "flex w-full items-start gap-3 px-3 py-2 text-left transition-colors rounded-md",
                tierSelected
                  ? "bg-[var(--ds1-main-bg-layer-2)]"
                  : "hover:bg-[var(--ds1-main-bg-layer-2)]"
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
              <div className="flex flex-1 flex-col min-w-0">
                <span className="text-xs font-semibold truncate">{tier.name}</span>
                {tier.description && (
                  <span className="text-xs leading-tight text-[var(--ds1-main-text-secondary)]">
                    {tier.description}
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-baseline gap-2 shrink-0 text-right">
                <span className="text-xs text-[var(--ds1-main-text-secondary)] whitespace-nowrap">
                  {tier.maxValue || ""}
                </span>
                <span className="text-xs text-[var(--ds1-main-text-secondary)] whitespace-nowrap">
                  {tier.businessDays || ""}
                </span>
                <span className="text-xs font-bold whitespace-nowrap min-w-[3rem]">
                  {tier.price}
                </span>
              </div>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SimpleTierList({
  tiers,
  selectedTier,
  onSelect,
}: {
  tiers: ServiceTier[];
  selectedTier: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      {tiers.map((tier) => {
        const tierSelected = selectedTier === tier.id;
        const subtitle = [tier.group, tier.description].filter(Boolean).join(" · ");

        return (
          <button
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
              tierSelected
                ? "bg-[var(--ds1-main-bg-layer-2)]"
                : "hover:bg-[var(--ds1-main-bg-layer-2)]"
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
            <div className="flex flex-1 flex-col min-w-0">
              <span className="text-xs font-semibold">{tier.name}</span>
              {subtitle && (
                <span className="text-xs leading-tight text-[var(--ds1-main-text-secondary)]">
                  {subtitle}
                </span>
              )}
            </div>
            <span className="shrink-0 text-xs font-bold">{tier.price}</span>
          </button>
        );
      })}
    </div>
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
    } else if (expandedGrader) {
      setExpandedGrader(null);
      setTimeout(() => {
        setExpandedGrader(graderId);
        setGrader(graderId);
      }, 220);
    } else {
      setExpandedGrader(graderId);
      setGrader(graderId);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-bold leading-6">
            What condition are your cards?
          </h3>
        </div>

        <div className="flex flex-col gap-3">
        <RadioCard
            selected={state.cardCondition === "graded"}
            onSelect={() => setCardCondition("graded")}
            label="Authenticated"
          />
          <RadioCard
            selected={state.cardCondition === "raw"}
            onSelect={() => setCardCondition("raw")}
            label="Raw"
          />
        </div>
      </div>

      {state.cardCondition === "raw" && (
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
              const isExpanded = expandedGrader === grader.id;

              return (
                <div
                  key={grader.id}
                  className={cn(
                    "overflow-hidden rounded-lg border border-[var(--ds1-main-divider-primary)] transition-colors"
                  )}
                >
                  <button
                    onClick={() => handleGraderClick(grader.id)}
                    className="flex w-full items-center justify-between text-left p-4"
                  >
                    {GRADER_LOGOS[grader.id] && (
                      <img
                        src={GRADER_LOGOS[grader.id]}
                        alt={`${grader.name} logo`}
                        className="h-5 w-auto max-w-80 shrink-0"
                      />
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-[var(--ds1-main-icon-secondary)] transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-out",
                      isExpanded
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      {(() => {
                        const useTable = grader.tiers.length > 3;
                        return useTable ? (
                          <TierTable
                            tiers={grader.tiers}
                            selectedTier={state.selectedTier}
                            onSelect={setTier}
                          />
                        ) : (
                          <SimpleTierList
                            tiers={grader.tiers}
                            selectedTier={state.selectedTier}
                            onSelect={setTier}
                          />
                        );
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
