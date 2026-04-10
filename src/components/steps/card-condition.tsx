"use client";

import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";

function ConditionCard({
  selected,
  onSelect,
  label,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description: string;
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
        <span className="text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
          {description}
        </span>
      </div>
    </button>
  );
}

export function CardConditionStep() {
  const { state, setCardCondition } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold leading-6">
          What condition are your cards?
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        <ConditionCard
          selected={state.cardCondition === "graded"}
          onSelect={() => setCardCondition("graded")}
          label="Authenticated"
          description="Cards certified by PSA, CGC, Beckett, or SGC"
        />
        <ConditionCard
          selected={state.cardCondition === "raw"}
          onSelect={() => setCardCondition("raw")}
          label="Raw"
          description="Cards that need authentication"
        />
      </div>
    </div>
  );
}
