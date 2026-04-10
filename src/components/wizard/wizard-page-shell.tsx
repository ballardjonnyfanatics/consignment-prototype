"use client";

import { ChevronLeft } from "lucide-react";
import { useWizard } from "./wizard-context";
import { ProgressBar, StepContent, getCtaLabel } from "./wizard-shared";

export function WizardPageShell() {
  const {
    state,
    currentStep,
    progressPercent,
    canGoBack,
    goNext,
    goBack,
    reset,
    setListingIntent,
    isAddingPsaCard,
    setIsAddingPsaCard,
  } = useWizard();

  const ctaLabel = isAddingPsaCard ? null : getCtaLabel(currentStep);
  const isListingStep = currentStep === "listing-intent";
  const hasAuctionSelected =
    state.listingIntent === "weekly-auction" ||
    state.listingIntent === "premier-auction";

  function handleCta() {
    if (currentStep === "confirmation") {
      reset();
    } else {
      goNext();
    }
  }

  function handleSkipListing() {
    setListingIntent("vault");
    goNext();
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
    <div className="flex min-h-screen items-start justify-center bg-[var(--ds1-main-bg-layer-0)] p-4 sm:p-8">
      <div className="flex min-h-[calc(100vh-6rem)] w-full max-w-[600px] flex-col rounded-2xl bg-[var(--ds1-main-bg-layer-1)] sm:min-h-[calc(100vh-6rem)]">
        <header className="flex shrink-0 items-center p-1.5">
          <div className="w-11">
            {showBackButton && (
              <button
                onClick={handleBack}
                aria-label="Go back"
                className="flex shrink-0 items-center justify-center rounded-full p-3 transition-colors hover:bg-[var(--ds1-main-bg-fill-null-hover)]"
              >
                <ChevronLeft className="h-5 w-5 text-[var(--ds1-main-icon-primary)]" />
              </button>
            )}
          </div>
          <div className="flex flex-1 items-center justify-center px-2.5 py-2.5">
            <span className="text-lg font-bold leading-6">Submission</span>
          </div>
          <div className="w-11" />
        </header>

        <ProgressBar percent={progressPercent} />

        <main className="mx-auto flex w-full flex-1 flex-col gap-6 p-6">
          <StepContent />
        </main>

        {ctaLabel && (
          <footer className="mx-auto w-full  p-8">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCta}
                disabled={isListingStep && !hasAuctionSelected}
                className="flex w-full items-center justify-center rounded-full bg-[var(--ds1-main-bg-fill)] px-8 py-4 text-base font-bold text-[var(--ds1-main-text-primary-inverse)] transition-colors hover:bg-[var(--ds1-main-bg-fill-hover)] disabled:bg-[var(--ds1-main-bg-fill-disabled)] disabled:text-[var(--ds1-main-text-disabled)]"
              >
                {ctaLabel}
              </button>
              {isListingStep && (
                <button
                  onClick={handleSkipListing}
                  className="flex w-full items-center justify-center rounded-full border-2 border-[var(--ds1-main-border-primary)] px-8 py-4 text-base font-bold transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
                >
                  Skip for now
                </button>
              )}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
