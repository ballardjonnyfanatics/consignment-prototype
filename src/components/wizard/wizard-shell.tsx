"use client";

import { ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelBody,
  SidePanelFooter,
} from "@/components/ui/side-panel";
import { useWizard } from "./wizard-context";

import { ItemTypeStep } from "@/components/steps/item-type";
import { GraderStep } from "@/components/steps/grader";
import { ItemDetailsStep } from "@/components/steps/item-details";
import { ListingIntentStep } from "@/components/steps/listing-intent";
import { ReviewStep } from "@/components/steps/review";
import { ConfirmationStep } from "@/components/steps/confirmation";

interface WizardShellProps {
  open: boolean;
  onClose: () => void;
}

function ProgressBar({ percent }: { percent: number }) {
  if (percent <= 0) return null;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--ds1-main-bg-fill-alpha)]">
      <div
        className="h-full rounded-full bg-[var(--ds1-main-bg-fill)] transition-all duration-500 ease-out"
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

function IconButton({
  onClick,
  children,
  className,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full p-3 transition-colors hover:bg-[var(--ds1-main-bg-fill-null-hover)]",
        className
      )}
    >
      {children}
    </button>
  );
}

function StepContent() {
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

function getCtaLabel(step: string): string | null {
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

export function WizardShell({ open, onClose }: WizardShellProps) {
  const {
    currentStep,
    progressPercent,
    canGoBack,
    goNext,
    goBack,
    reset,
    isAddingPsaCard,
    setIsAddingPsaCard,
  } = useWizard();

  const ctaLabel = isAddingPsaCard ? null : getCtaLabel(currentStep);

  function handleClose() {
    reset();
    onClose();
  }

  function handleCta() {
    if (currentStep === "confirmation") {
      handleClose();
    } else {
      goNext();
    }
  }

  function handleBack() {
    if (isAddingPsaCard) {
      setIsAddingPsaCard(false);
    } else {
      goBack();
    }
  }

  const showBackButton = canGoBack || isAddingPsaCard;

  return (
    <SidePanel
      open={open}
      onOpenChange={(o) => !o && handleClose()}
      onBackdropClick={handleClose}
      modal={false}
    >
      <SidePanelContent>
        <SidePanelHeader>
          <div className="w-11">
            {showBackButton && (
              <IconButton onClick={handleBack} label="Go back">
                <ChevronLeft className="h-5 w-5 text-[var(--ds1-main-icon-primary)]" />
              </IconButton>
            )}
          </div>
          <div className="flex flex-1 items-center justify-center px-2.5 py-2.5">
            <span className="text-center text-lg font-bold leading-6">
              Submission
            </span>
          </div>
          <IconButton onClick={handleClose} label="Close">
            <X className="h-5 w-5 text-[var(--ds1-main-icon-primary)]" />
          </IconButton>
        </SidePanelHeader>

        <SidePanelBody>
          <div className="flex flex-col gap-6">
            <ProgressBar percent={progressPercent} />
            <StepContent />
          </div>
        </SidePanelBody>

        {ctaLabel && (
          <SidePanelFooter>
            <button
              onClick={handleCta}
              className="flex w-full items-center justify-center rounded-full bg-[var(--ds1-main-bg-fill)] px-8 py-4 text-base font-bold text-[var(--ds1-main-text-primary-inverse)] transition-colors hover:bg-[var(--ds1-main-bg-fill-hover)]"
            >
              {ctaLabel}
            </button>
          </SidePanelFooter>
        )}
      </SidePanelContent>
    </SidePanel>
  );
}
