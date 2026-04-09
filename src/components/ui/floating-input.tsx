"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  inputMode?: "text" | "numeric" | "decimal";
  min?: number;
  prefix?: string;
  className?: string;
}

export function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  min,
  prefix,
  className,
}: FloatingInputProps) {
  const id = React.useId();
  const hasValue = value !== "" && value !== 0;

  return (
    <div className={cn("relative", className)}>
      {prefix && hasValue && (
        <span className="pointer-events-none absolute left-3 top-[22px] text-base leading-6 text-[var(--ds1-main-text-primary)]">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        min={min}
        placeholder=" "
        value={value === 0 ? "" : value}
        onChange={onChange}
        className={cn(
          "peer w-full rounded-[var(--ds1-radius-input)] border border-[var(--ds1-main-border-primary)] bg-[var(--ds1-main-input-bg-fill)] px-3 pt-5 pb-2 text-base leading-6 text-[var(--ds1-main-text-primary)] outline-none transition-colors focus:border-2 focus:border-[var(--ds1-main-border-primary-active)] focus:px-[11px] focus:pt-[19px] focus:pb-[7px]",
          prefix && hasValue && "pl-7 focus:pl-[27px]"
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3 transition-all duration-150 ease-out",
          "text-[var(--ds1-main-text-placeholder)]",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal",
          "peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-[var(--ds1-main-text-secondary)]",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-[var(--ds1-main-text-secondary)]"
        )}
      >
        {label}
      </label>
    </div>
  );
}
