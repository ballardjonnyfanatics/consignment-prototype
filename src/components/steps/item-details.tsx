"use client";

import * as React from "react";
import { Plus, Minus, MoreHorizontal } from "lucide-react";
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
  card,
  onRemove,
}: {
  card: { year: string; product: string; player: string; cardNumber: string; type: string; estimatedValue: number; quantity: number };
  onRemove: () => void;
}) {
  const titleParts = [card.year, card.product].filter(Boolean);
  const title = titleParts.length > 0 ? titleParts.join(" ") : "Untitled card";

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-[var(--ds1-main-bg-layer-2)] p-3">
      <div className="flex items-center gap-2">
        <p className="flex-1 truncate text-base font-bold text-[var(--ds1-main-text-primary)]">
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
      <div className="flex flex-col text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
        <span>{card.player}{card.cardNumber ? ` · #${card.cardNumber}` : ""}</span>
        {card.type && <span>{card.type}</span>}
        <span>${card.estimatedValue.toLocaleString()} · Qty {card.quantity}</span>
      </div>
    </div>
  );
}

function AddCardForm({ onSave }: { onSave: (card: { year: string; product: string; player: string; cardNumber: string; type: string; estimatedValue: number; quantity: number }) => void }) {
  const [year, setYear] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [player, setPlayer] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [type, setType] = React.useState("");
  const [value, setValue] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(1);

  const canSave = player.trim().length > 0 && value > 0;

  function handleSave() {
    if (!canSave) return;
    onSave({
      year: year.trim(),
      product: product.trim(),
      player: player.trim(),
      cardNumber: cardNumber.trim(),
      type: type.trim(),
      estimatedValue: value,
      quantity,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold leading-6">Add a card</h3>

      <div className="flex flex-col gap-3">
        <FloatingInput
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <FloatingInput
          label="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <FloatingInput
          label="Player or character"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <FloatingInput
          label="Card #"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <FloatingInput
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <FloatingInput
          label="Estimated value"
          type="number"
          inputMode="numeric"
          min={0}
          prefix="$"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
        />
        <div className="flex items-center justify-between rounded-[var(--ds1-radius-input)] border border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 py-2.5">
          <span className="text-sm text-[var(--ds1-main-text-secondary)]">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ds1-main-border-primary)] transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ds1-main-border-primary)] transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!canSave}
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
          PSA require an itemised list of all the items you are submitting.
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
              card={card}
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
