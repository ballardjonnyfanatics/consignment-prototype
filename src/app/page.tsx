"use client";

import * as React from "react";
import Link from "next/link";
import { WizardProvider } from "@/components/wizard/wizard-context";
import { WizardShell } from "@/components/wizard/wizard-shell";

export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <WizardProvider>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold">Consignment Prototype</h1>
          <p className="max-w-md text-sm text-[var(--ds1-main-text-secondary)]">
            Submission wizard flow for Fanatics Collect. Choose a variant below.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-[var(--ds1-main-bg-fill)] px-8 py-4 text-base font-bold text-[var(--ds1-main-text-primary-inverse)] transition-colors hover:bg-[var(--ds1-main-bg-fill-hover)]"
          >
            Side Panel
          </button>
          <Link
            href="/submit"
            className="rounded-full border-2 border-[var(--ds1-main-border-primary)] px-8 py-4 text-base font-bold transition-colors hover:bg-[var(--ds1-main-bg-fill-alpha)]"
          >
            In-Page
          </Link>
        </div>

        <WizardShell open={open} onClose={() => setOpen(false)} />
      </main>
    </WizardProvider>
  );
}
