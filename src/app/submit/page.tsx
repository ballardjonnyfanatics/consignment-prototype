"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { WizardProvider } from "@/components/wizard/wizard-context";
import { WizardPageShell } from "@/components/wizard/wizard-page-shell";

export default function SubmitPage() {
  return (
    <WizardProvider>
      <div className="fixed left-0 top-0 z-50 flex w-full items-center gap-2 bg-black/80 px-3 py-1.5 text-xs text-white/70">
        <Link href="/" className="flex items-center gap-1 hover:text-white">
          <ChevronLeft className="h-3 w-3" />
          Home
        </Link>
        <span className="text-white/30">·</span>
        <span>In-Page Variant</span>
      </div>
      <div className="pt-8">
        <WizardPageShell />
      </div>
    </WizardProvider>
  );
}
