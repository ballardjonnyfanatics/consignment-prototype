"use client";

import * as React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizard } from "@/components/wizard/wizard-context";

function SimpleForm() {
  const { state, setItemCount, setEstimatedValue } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold leading-6">
          Tell us about the cards you&apos;re sending
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="Number of cards"
          value={state.itemCount || ""}
          onChange={(e) => setItemCount(parseInt(e.target.value) || 0)}
          className="w-full rounded-[var(--ds1-radius-input)] border-1 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 py-3 text-base text-[var(--ds1-main-text-primary)] placeholder:text-[var(--ds1-main-text-placeholder)] outline-none transition-colors focus:border-[var(--ds1-main-border-focus)]"
        />
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-[var(--ds1-main-text-placeholder)]">
            {state.estimatedValue ? "$" : ""}
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Estimated total value"
            value={state.estimatedValue || ""}
            onChange={(e) => setEstimatedValue(parseFloat(e.target.value) || 0)}
            className={cn(
              "w-full rounded-[var(--ds1-radius-input)] border-1 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 py-3 text-base text-[var(--ds1-main-text-primary)] placeholder:text-[var(--ds1-main-text-placeholder)] outline-none transition-colors focus:border-[var(--ds1-main-border-focus)]",
              state.estimatedValue ? "pl-7" : ""
            )}
          />
        </div>
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--ds1-main-text-secondary)]">Title</label>
          <input
            type="text"
            placeholder="e.g. 2023 Pokemon Japanese TCG Classic Collection"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-[var(--ds1-radius-input)] border-2 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 py-3 text-base text-[var(--ds1-main-text-primary)] placeholder:text-[var(--ds1-main-text-placeholder)] outline-none transition-colors focus:border-[var(--ds1-main-border-focus)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--ds1-main-text-secondary)]">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-[var(--ds1-radius-input)] border-2 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 py-3 text-base text-[var(--ds1-main-text-primary)] placeholder:text-[var(--ds1-main-text-placeholder)] outline-none transition-colors focus:border-[var(--ds1-main-border-focus)]"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--ds1-main-text-secondary)]">Estimated value</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-[var(--ds1-main-text-placeholder)]">$</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="0"
                value={value || ""}
                onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                className="w-full rounded-[var(--ds1-radius-input)] border-2 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] py-3 pl-7 pr-3 text-base text-[var(--ds1-main-text-primary)] placeholder:text-[var(--ds1-main-text-placeholder)] outline-none transition-colors focus:border-[var(--ds1-main-border-focus)]"
              />
            </div>
          </div>

          <div className="flex w-24 flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--ds1-main-text-secondary)]">Quantity</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full rounded-[var(--ds1-radius-input)] border-2 border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 py-3 text-base text-[var(--ds1-main-text-primary)] placeholder:text-[var(--ds1-main-text-placeholder)] outline-none transition-colors focus:border-[var(--ds1-main-border-focus)]"
            />
          </div>
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

function SlideTransition({
  show,
  direction,
  children,
}: {
  show: boolean;
  direction: "left" | "right";
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(show);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (show) {
      setMounted(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!mounted) return null;

  const enterFrom = direction === "right" ? "translate-x-8" : "-translate-x-8";

  return (
    <div
      className={cn(
        "transition-all duration-200 ease-out",
        animating ? "translate-x-0 opacity-100" : `${enterFrom} opacity-0`
      )}
    >
      {children}
    </div>
  );
}

function PsaItemisedList() {
  const { state, addPsaCard, removePsaCard, isAddingPsaCard, setIsAddingPsaCard } = useWizard();

  const totalItems = state.psaCards.reduce((sum, c) => sum + c.quantity, 0);
  const totalValue = state.psaCards.reduce((sum, c) => sum + c.estimatedValue * c.quantity, 0);

  return (
    <div className="relative overflow-hidden">
      <SlideTransition show={!isAddingPsaCard} direction="left">
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
      </SlideTransition>

      <SlideTransition show={isAddingPsaCard} direction="right">
        <AddCardForm
          onSave={(card) => {
            addPsaCard(card);
            setIsAddingPsaCard(false);
          }}
        />
      </SlideTransition>
    </div>
  );
}

export function ItemDetailsStep() {
  const { state } = useWizard();
  const isPsa = state.selectedGrader === "psa";

  return isPsa ? <PsaItemisedList /> : <SimpleForm />;
}
