"use client";

import * as React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { useWizard } from "@/components/wizard/wizard-context";
import { FloatingInput } from "@/components/ui/floating-input";

function SimpleForm() {
  const { state, setItemCount, setEstimatedValue } = useWizard();

  const itemLabel =
    state.itemCategory === "trading-cards" ? "cards" : "items";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold leading-6">
          Tell us about the {itemLabel} you&apos;re sending
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        <FloatingInput
          label={`Number of ${itemLabel}`}
          type="number"
          inputMode="numeric"
          min={0}
          value={state.itemCount}
          onChange={(e) => setItemCount(parseInt(e.target.value) || 0)}
        />
        <FloatingInput
          label="Estimated total value"
          type="number"
          inputMode="numeric"
          min={0}
          prefix="$"
          value={state.estimatedValue}
          onChange={(e) => setEstimatedValue(parseFloat(e.target.value) || 0)}
        />
      </div>
    </div>
  );
}

function PsaCardRow({
  title,
  type,
  estimatedValue,
  quantity,
  onRemove,
}: {
  title: string;
  type: string;
  estimatedValue: number;
  quantity: number;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-[var(--ds1-main-bg-layer-1)] px-3 pb-4 pt-3">
      <div className="flex items-center gap-2">
        <p className="flex-1 truncate text-base font-medium text-[var(--ds1-main-text-primary)]">
          {title}
        </p>
        <button
          onClick={onRemove}
          className="shrink-0 rounded-full p-1 transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
          aria-label="Remove card"
        >
          <MoreHorizontal className="h-5 w-5 text-[var(--ds1-main-icon-secondary)]" />
        </button>
      </div>
      <div className="flex flex-col text-xs leading-4 text-[var(--ds1-main-text-primary)]">
        <span>Type: {type}</span>
        <span>Estimated value: ${estimatedValue.toLocaleString()}</span>
        <span>Quantity: {quantity}</span>
      </div>
    </div>
  );
}

function AddCardForm({ onSave }: { onSave: (card: { title: string; type: string; estimatedValue: number; quantity: number }) => void }) {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("Trading Card Game");
  const [value, setValue] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(1);

  function handleSave() {
    if (!title.trim() || value <= 0) return;
    onSave({ title: title.trim(), type, estimatedValue: value, quantity });
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold leading-6">Add a card</h3>

      <div className="flex flex-col gap-3">
        <FloatingInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FloatingInput
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <div className="flex gap-3">
          <FloatingInput
            label="Estimated value"
            type="number"
            inputMode="numeric"
            min={0}
            prefix="$"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            className="flex-1"
          />
          <FloatingInput
            label="Quantity"
            type="number"
            inputMode="numeric"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-24"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!title.trim() || value <= 0}
        className="flex w-full items-center justify-center rounded-full bg-[var(--ds1-main-bg-fill)] px-8 py-4 text-base font-bold text-[var(--ds1-main-text-primary-inverse)] transition-colors hover:bg-[var(--ds1-main-bg-fill-hover)] disabled:bg-[var(--ds1-main-bg-fill-disabled)] disabled:text-[var(--ds1-main-text-disabled)]"
      >
        Save card
      </button>
    </div>
  );
}

function PsaItemisedList() {
  const { state, addPsaCard, removePsaCard, isAddingPsaCard, setIsAddingPsaCard } = useWizard();

  const totalItems = state.psaCards.reduce((sum, c) => sum + c.quantity, 0);
  const totalValue = state.psaCards.reduce((sum, c) => sum + c.estimatedValue * c.quantity, 0);

  if (isAddingPsaCard) {
    return (
      <AddCardForm
        onSave={(card) => {
          addPsaCard(card);
          setIsAddingPsaCard(false);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold leading-6">
          Tell us about the cards you&apos;re sending
        </h3>
        <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
          PSA require an itemised list of all the ungraded items you are
          submitting.
        </p>
      </div>

      {state.psaCards.length > 0 && (
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-bold">{totalItems}</span>
          <span className="text-[var(--ds1-main-text-secondary)]">items</span>
          <span className="font-bold">
            ${totalValue.toLocaleString()}
          </span>
          <span className="text-[var(--ds1-main-text-secondary)]">
            estimated value
          </span>
        </div>
      )}

      {state.psaCards.length > 0 && (
        <div className="flex flex-col gap-2">
          {state.psaCards.map((card) => (
            <PsaCardRow
              key={card.id}
              title={card.title}
              type={card.type}
              estimatedValue={card.estimatedValue}
              quantity={card.quantity}
              onRemove={() => removePsaCard(card.id)}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => setIsAddingPsaCard(true)}
        className="flex w-fit items-center gap-1.5 rounded-full border-2 border-[var(--ds1-main-border-primary)] px-4 py-2 text-sm font-bold transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
      >
        <Plus className="h-4 w-4" />
        Add card
      </button>
    </div>
  );
}

export function ItemDetailsStep() {
  const { state } = useWizard();
  const isPsa = state.selectedGrader === "psa";

  return isPsa ? <PsaItemisedList /> : <SimpleForm />;
}
