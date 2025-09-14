"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/cn";

/* =========================
   cva — base + variants
========================= */
const buttonStyles = cva(
    [
        "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none font-medium",
        "transition-colors transition-transform duration-150 ease-in-out",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black",
        "disabled:opacity-50 disabled:pointer-events-none",
    ],
    {
        variants: {
            variant: {
                solid: "",
                outline: "bg-transparent border",
                link: cn(
                    "inline-flex items-center gap-2 underline underline-offset-8 decoration-1",
                    "text-black hover:decoration-2 hover:opacity-80"
                ),
            },
            size: {
                xs: "h-8 px-3 text-xs",
                sm: "h-9 px-3.5 text-sm",
                md: "h-10 px-4 text-sm",
                lg: "h-11 px-5 text-base",
                xl: "h-12 px-6 text-lg",
            },
            shape: {
                pill: "rounded-full",
                rounded: "rounded-md",
                sharp: "rounded-none",
            },
            color: {
                default: [
                    "border-black text-black bg-transparent",
                    "data-[variant=solid]:bg-black data-[variant=solid]:text-white",
                    "hover:bg-black hover:text-white",
                ].join(" "),
                white: [
                    "border-white text-white bg-transparent",
                    "data-[variant=solid]:bg-white data-[variant=solid]:text-black",
                    "hover:bg-white hover:text-black",
                ].join(" "),
            },
        },
        defaultVariants: {
            variant: "solid",
            size: "md",
            shape: "pill",
            color: "default",
        },
    }
);

/* =========================
   Types
========================= */
type Variant = "solid" | "outline" | "link";
type SizeKey = "xs" | "sm" | "md" | "lg" | "xl";
type Shape = "pill" | "rounded" | "sharp";
type Color = "default" | "white";

export type ButtonProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color"
> &
    VariantProps<typeof buttonStyles> & {
    variant?: Variant;
    size?: SizeKey;
    shape?: Shape;
    color?: Color;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

/* =========================
   Button
========================= */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "solid",
            size,
            shape,
            color,
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            type = "button",
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                aria-busy={isLoading || undefined}
                data-variant={variant} // 👈 so color styles can react to variant
                className={cn(buttonStyles({ variant, size, shape, color }), className)}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 -ml-1">Loading…</span>
                ) : leftIcon ? (
                    <span className="mr-2 -ml-1">{leftIcon}</span>
                ) : null}

                {children}

                {!isLoading && rightIcon ? (
                    <span className="ml-2 -mr-1">{rightIcon}</span>
                ) : null}
            </button>
        );
    }
);
Button.displayName = "Button";

/* =========================
   IconButton
========================= */
const sizeSquareMap: Record<SizeKey, string> = {
    xs: "h-8 w-8",
    sm: "h-9 w-9",
    md: "h-10 w-10",
    lg: "h-11 w-11",
    xl: "h-12 w-12",
};

type IconButtonProps = Omit<
    ButtonProps,
    "leftIcon" | "rightIcon" | "children"
> & {
    children: React.ReactNode;
};

/** A tiny wrapper so icon-only buttons are perfectly square. */
export function IconButton({
                               children,
                               size = "md",
                               shape = "rounded",
                               variant = "outline",
                               color = "default",
                               className,
                               ...props
                           }: IconButtonProps) {
    return (
        <Button
            aria-label="Icon button"
            variant={variant}
            size={size}
            shape={shape}
            color={color}
            className={cn("p-0", sizeSquareMap[size], className)}
            {...props}
        >
            {children}
        </Button>
    );
}

export default Button;
