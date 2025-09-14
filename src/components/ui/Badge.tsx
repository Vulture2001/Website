import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import React from "react";

const badge = cva(
    "inline-flex items-center gap-1 font-medium select-none",
    {
        variants: {
            variant: {
                solid: "bg-black text-white",
                outline: "bg-transparent border border-black text-black",
                soft: "bg-black/10 text-black",
            },
            size: {
                sm: "h-6 px-2 text-xs rounded-full",
                md: "h-7 px-2.5 text-sm rounded-full",
                lg: "h-8 px-3 text-base rounded-full",
                xl: "h-10 px-4 text-lg rounded-full", // new size
            },
            shape: {
                pill: "rounded-full",
                rounded: "rounded-md",
                sharp: "rounded-none",
            },
        },
        defaultVariants: {
            variant: "solid",
            size: "md",
            shape: "pill",
        },
    }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof badge> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export function Badge({
                          className,
                          leftIcon,
                          rightIcon,
                          children,
                          ...props
                      }: BadgeProps) {
    return (
        <span className={cn(badge(props), className)}>
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </span>
    );
}

export function NumBadge({ n }: { n: number }) {
    return (
        <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-black text-sm font-semibold text-black">
      {n}
    </span>
    );
}
