"use client";

import { Copy } from "lucide-react";

export function ConfirmationStep() {
  function handleCopy() {
    navigator.clipboard.writeText(
      "Matthew Morgan\n7600 SW Durham Rd, ID 1312662\nTigard, OR 97224"
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <img src="/check.png" alt="Success" className="h-24 w-24" />
        <h2 style={{ fontFamily: "var(--ds1-font-display)" }} className="text-5xl font-bold uppercase tracking-wide">
          You&apos;re all set
        </h2>
        <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
          Time to ship your cards
        </p>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-1">
          <span>👉</span>
          <span>Use protective sleeves or top loaders</span>
        </div>
        <div className="flex items-center gap-1">
          <span>👉</span>
          <span>Ship in a bubble mailer or sturdy envelope</span>
        </div>
        <div className="flex items-center gap-1">
          <span>👉</span>
          <span>Include the packing slip</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-1 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
        <span className="text-sm font-bold">Ship to</span>
        <div className="text-xs leading-4 text-[var(--ds1-main-text-secondary)]">
          Matthew Morgan
          <br />
          7600 SW Durham Rd, ID 1312662
          <br />
          Tigard, OR 97224
        </div>
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md p-1.5 transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
          aria-label="Copy address"
        >
          <Copy className="h-5 w-5 text-[var(--ds1-main-icon-primary)]" />
        </button>
      </div>

      <button className="flex w-full items-center justify-center rounded-full border border-[var(--ds1-main-border-primary)] py-3 text-base font-bold transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]">
        Download packing slip
      </button>
    </div>
  );
}
