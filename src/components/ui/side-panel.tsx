"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type SidePanelProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
> & {
  showBackdrop?: boolean;
  onBackdropClick?: () => void;
};

function SidePanel({
  children,
  open,
  showBackdrop = true,
  onBackdropClick,
  ...props
}: SidePanelProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const original = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      overflow: document.body.style.overflow,
      width: document.body.style.width,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    return () => {
      Object.assign(document.body.style, original);
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <>
      {showBackdrop &&
        open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/50 animate-in fade-in-0"
            onClick={onBackdropClick}
          />,
          document.body
        )}
      <DialogPrimitive.Root open={open} {...props}>
        {children}
      </DialogPrimitive.Root>
    </>
  );
}

const sidePanelVariants = cva(
  "fixed z-[10000] w-full bg-[var(--ds1-main-bg-layer-1)] shadow-[0px_16px_64px_rgba(0,0,0,0.22)] transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 sm:w-[480px]",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full rounded-none sm:right-2 sm:top-2 sm:bottom-2 sm:h-auto sm:rounded-2xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: { side: "right" },
  }
);

interface SidePanelContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sidePanelVariants> {}

const SidePanelContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SidePanelContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        sidePanelVariants({ side }),
        "flex flex-col overflow-hidden border border-[var(--ds1-main-border-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SidePanelContent.displayName = "SidePanelContent";

function SidePanelHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center gap-1.5 p-1.5",
        className
      )}
      {...props}
    />
  );
}

function SidePanelBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-x-clip overflow-y-auto px-4 py-6", className)}
      {...props}
    />
  );
}

function SidePanelFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "shrink-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4",
        className
      )}
      {...props}
    />
  );
}

export {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelBody,
  SidePanelFooter,
};
