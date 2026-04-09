"use client";

import { Scan, Eye, Package } from "lucide-react";

export function IntroStep() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-[family-name:var(--ds1-font-display)] text-5xl font-bold uppercase tracking-wide">
        How it works
      </h2>

      <div className="flex flex-col gap-3 rounded-xl bg-[var(--ds1-main-bg-layer-2)] p-4">
        <div className="flex items-center gap-2">
          <Scan className="h-6 w-6 shrink-0 text-[var(--ds1-main-icon-primary)]" />
          <span className="text-base font-bold">Tell us about your cards</span>
        </div>
        <div className="h-px bg-[var(--ds1-main-divider-primary)]" />
        <div className="flex items-center gap-2">
          <Eye className="h-6 w-6 shrink-0 text-[var(--ds1-main-icon-primary)]" />
          <span className="text-base font-bold">
            Select an authenticator (raw only)
          </span>
        </div>
        <div className="h-px bg-[var(--ds1-main-divider-primary)]" />
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 shrink-0 text-[var(--ds1-main-icon-primary)]" />
          <span className="text-base font-bold">Send your cards</span>
        </div>
      </div>

      <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
        After that, we&apos;ll take care of the rest &mdash; authenticating your
        cards and adding them to the Vault
      </p>
    </div>
  );
}
