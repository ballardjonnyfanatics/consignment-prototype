"use client";

import * as React from "react";
import {
  type SubmissionState,
  type ItemCategory,
  type CardCondition,
  type ListingIntent,
  initialSubmissionState,
} from "@/lib/submission-types";

export type WizardStep =
  | "intro"
  | "item-type"
  | "grader"
  | "listing-intent"
  | "review"
  | "confirmation";

function getStepsForPath(state: SubmissionState): WizardStep[] {
  const steps: WizardStep[] = ["intro", "item-type"];

  if (state.itemCategory === "trading-cards" && state.cardCondition === "raw") {
    steps.push("grader");
  }

  if (
    state.itemCategory === "trading-cards" ||
    state.itemCategory === "comics-collectibles" ||
    state.itemCategory === "large-items"
  ) {
    steps.push("listing-intent");
  }

  steps.push("review", "confirmation");
  return steps;
}

interface WizardContextValue {
  state: SubmissionState;
  currentStep: WizardStep;
  steps: WizardStep[];
  currentStepIndex: number;
  progressPercent: number;
  canGoBack: boolean;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
  updateState: (partial: Partial<SubmissionState>) => void;
  setItemCategory: (cat: ItemCategory) => void;
  setCardCondition: (cond: CardCondition) => void;
  setGrader: (graderId: string) => void;
  setTier: (tierId: string) => void;
  setListingIntent: (intent: ListingIntent) => void;
}

const WizardContext = React.createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SubmissionState>(initialSubmissionState);
  const [stepIndex, setStepIndex] = React.useState(0);

  const steps = React.useMemo(() => getStepsForPath(state), [state]);
  const currentStep = steps[stepIndex] ?? "intro";

  const wizardSteps = steps.filter(
    (s) => s !== "intro" && s !== "confirmation"
  );
  const wizardIndex = wizardSteps.indexOf(currentStep as typeof wizardSteps[number]);
  const totalWizardSteps = wizardSteps.length;

  let progressPercent = 0;
  if (currentStep === "intro") {
    progressPercent = 0;
  } else if (currentStep === "confirmation") {
    progressPercent = 100;
  } else if (wizardIndex >= 0) {
    progressPercent = ((wizardIndex + 1) / (totalWizardSteps + 0.1)) * 100;
  }

  const canGoBack = stepIndex > 0 && currentStep !== "confirmation";

  function goNext() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  }

  function goBack() {
    if (canGoBack) {
      setStepIndex(stepIndex - 1);
    }
  }

  function reset() {
    setState(initialSubmissionState);
    setStepIndex(0);
  }

  function updateState(partial: Partial<SubmissionState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  const value: WizardContextValue = {
    state,
    currentStep,
    steps,
    currentStepIndex: stepIndex,
    progressPercent,
    canGoBack,
    goNext,
    goBack,
    reset,
    updateState,
    setItemCategory: (cat) => updateState({ itemCategory: cat, cardCondition: null, selectedGrader: null, selectedTier: null }),
    setCardCondition: (cond) => updateState({ cardCondition: cond, selectedGrader: null, selectedTier: null }),
    setGrader: (id) => updateState({ selectedGrader: id, selectedTier: null }),
    setTier: (id) => updateState({ selectedTier: id }),
    setListingIntent: (intent) => updateState({ listingIntent: intent }),
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = React.useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
