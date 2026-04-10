"use client";

import { useWizard } from "./wizard-context";
import { ItemTypeStep } from "@/components/steps/item-type";
import { GraderStep } from "@/components/steps/grader";
import { ItemDetailsStep } from "@/components/steps/item-details";
import { ListingIntentStep } from "@/components/steps/listing-intent";
import { ReviewStep } from "@/components/steps/review";
import { ConfirmationStep } from "@/components/steps/confirmation";

export function ProgressBar({ percent }: { percent: number }) {
  if (percent <= 0) return null;
  return (
    <div className="h-1 w-full overflow-hidden bg-[var(--ds1-main-bg-fill-alpha)]">
      <div
        className="flex h-full flex-col items-center bg-[var(--ds1-main-bg-fill)] transition-all duration-500 ease-out"
        style={{ width: `${Math.min(percent, 100)}%` }}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] via-20% to-[rgba(255,255,255,0.35)]" />
      </div>
    </div>
  );
}

export function StepContent() {
  const { currentStep } = useWizard();
  switch (currentStep) {
    case "item-type":
      return <ItemTypeStep />;
    case "grader":
      return <GraderStep />;
    case "item-details":
      return <ItemDetailsStep />;
    case "listing-intent":
      return <ListingIntentStep />;
    case "review":
      return <ReviewStep />;
    case "confirmation":
      return <ConfirmationStep />;
    default:
      return null;
  }
}

export function getCtaLabel(step: string): string | null {
  switch (step) {
    case "item-type":
    case "grader":
    case "item-details":
    case "listing-intent":
      return "Continue";
    case "review":
      return "Submit";
    case "confirmation":
      return "Done";
    default:
      return null;
  }
}
