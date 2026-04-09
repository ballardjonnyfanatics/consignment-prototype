"use client";

import * as React from "react";
import {
  type SubmissionState,
  type ItemCategory,
  type CardCondition,
  type ListingIntent,
  type GradingType,
  type PsaCardItem,
  initialSubmissionState,
} from "@/lib/submission-types";

export type WizardStep =
  | "item-type"
  | "grader"
  | "item-details"
  | "listing-intent"
  | "review"
  | "confirmation";

function getStepsForPath(state: SubmissionState): WizardStep[] {
  const steps: WizardStep[] = ["item-type"];

  if (state.itemCategory === "trading-cards") {
    steps.push("grader");
  }

  if (
    state.itemCategory === "trading-cards" ||
    state.itemCategory === "comics-collectibles" ||
    state.itemCategory === "large-items"
  ) {
    steps.push("item-details");
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
  setGradingType: (type: GradingType) => void;
  setListingIntent: (intent: ListingIntent) => void;
  setItemCount: (count: number) => void;
  setEstimatedValue: (value: number) => void;
  addPsaCard: (card: Omit<PsaCardItem, "id">) => void;
  removePsaCard: (id: string) => void;
  isAddingPsaCard: boolean;
  setIsAddingPsaCard: (v: boolean) => void;
}

const WizardContext = React.createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SubmissionState>(initialSubmissionState);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [isAddingPsaCard, setIsAddingPsaCard] = React.useState(false);

  const steps = React.useMemo(() => getStepsForPath(state), [state]);
  const clampedIndex = Math.min(stepIndex, steps.length - 1);
  const currentStep = steps[clampedIndex] ?? "item-type";

  const MAX_WIZARD_STEPS = 5; // item-type, grader, item-details, listing-intent, review
  const wizardSteps = steps.filter((s) => s !== "confirmation");
  const wizardIndex = wizardSteps.indexOf(currentStep as typeof wizardSteps[number]);

  let progressPercent = 0;
  if (currentStep === "confirmation") {
    progressPercent = 100;
  } else if (wizardIndex >= 0) {
    progressPercent = ((wizardIndex + 1) / (MAX_WIZARD_STEPS + 0.1)) * 100;
  }

  const canGoBack = clampedIndex > 0 && currentStep !== "confirmation";

  function goNext() {
    if (clampedIndex < steps.length - 1) {
      setStepIndex(clampedIndex + 1);
    }
  }

  function goBack() {
    if (canGoBack) {
      setStepIndex(clampedIndex - 1);
    }
  }

  function reset() {
    setState(initialSubmissionState);
    setStepIndex(0);
  }

  function updateState(partial: Partial<SubmissionState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  function addPsaCard(card: Omit<PsaCardItem, "id">) {
    setState((prev) => {
      const newCard: PsaCardItem = { ...card, id: crypto.randomUUID() };
      const psaCards = [...prev.psaCards, newCard];
      return {
        ...prev,
        psaCards,
        itemCount: psaCards.reduce((sum, c) => sum + c.quantity, 0),
        estimatedValue: psaCards.reduce((sum, c) => sum + c.estimatedValue * c.quantity, 0),
      };
    });
  }

  function removePsaCard(id: string) {
    setState((prev) => {
      const psaCards = prev.psaCards.filter((c) => c.id !== id);
      return {
        ...prev,
        psaCards,
        itemCount: psaCards.reduce((sum, c) => sum + c.quantity, 0),
        estimatedValue: psaCards.reduce((sum, c) => sum + c.estimatedValue * c.quantity, 0),
      };
    });
  }

  const value: WizardContextValue = {
    state,
    currentStep,
    steps,
    currentStepIndex: clampedIndex,
    progressPercent,
    canGoBack,
    goNext,
    goBack,
    reset,
    updateState,
    setItemCategory: (cat) => updateState({ itemCategory: cat, cardCondition: null, selectedGrader: null, selectedTier: null, psaCards: [], itemCount: 0, estimatedValue: 0 }),
    setCardCondition: (cond) => updateState({ cardCondition: cond, selectedGrader: null, selectedTier: null, psaCards: [], itemCount: 0, estimatedValue: 0 }),
    setGrader: (id) => updateState({ selectedGrader: id, selectedTier: null, gradingType: "card", psaCards: [], itemCount: 0, estimatedValue: 0 }),
    setTier: (id) => updateState({ selectedTier: id }),
    setGradingType: (type) => updateState({ gradingType: type, selectedTier: null }),
    setListingIntent: (intent) => updateState({ listingIntent: intent }),
    setItemCount: (count) => updateState({ itemCount: count }),
    setEstimatedValue: (value) => updateState({ estimatedValue: value }),
    addPsaCard,
    removePsaCard,
    isAddingPsaCard,
    setIsAddingPsaCard,
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
