"use client";

import { Copy, Play, Check } from "lucide-react";
import * as React from "react";

export function ConfirmationStep() {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(
      "Matthew Morgan\n7600 SW Durham Rd, ID 1312662\nTigard, OR 97224"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ds1-main-bg-fill-positive)]">
            <Check className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col gap-0">
            <h3 className="text-lg font-bold leading-6">Submission created</h3>
            <p className="text-sm leading-5 text-[var(--ds1-main-text-secondary)]">
            #2665328
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-md font-bold">How to pack your items</span>
        <button className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-[var(--ds1-main-bg-layer-2)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ds1-main-bg-fill)] transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-[var(--ds1-main-text-primary-inverse)] text-[var(--ds1-main-text-primary-inverse)]" />
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5 text-xs text-[var(--ds1-main-text-secondary)]">
          <div className="flex gap-2">
            <span className="shrink-0">✓</span>
            <span>Use protective sleeves or top loaders for each card</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0">✓</span>
            <span>Ship in a bubble mailer or sturdy box</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0">✓</span>
            <span>Include the packing slip in your package</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0">✓</span>
            <span>Use a tracked shipping service</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0">✓</span>
            <span>Ship to Matthew Morgan, 7600 SW Durham Rd, ID 1312662, Tigard, OR 97224</span>
          </div>
        </div>
      </div>
        <div className="flex gap-2">
          <button className="flex w-fit items-center justify-center rounded-full border border-[var(--ds1-main-border-primary)] px-5 py-2 text-sm font-bold transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]">
            Download packing slip
          </button>
          <button
            onClick={handleCopy}
            className="flex w-fit items-center gap-1.5 rounded-full border border-[var(--ds1-main-border-primary)] px-5 py-2 text-sm font-bold transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>
    </div>
  );
}
