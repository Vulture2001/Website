// ActionButton.tsx
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowIcon } from "../icons/ArrowIcon";

type Props = {
    href?: string;                // if provided -> renders a Link
    children: React.ReactNode;
    className?: string;
}

export function ActionButton({ href, children, className }: Props) {
    const content = (
        <>
            <span className="font-semibold">{children}</span>
            <ArrowIcon />
        </>
    )

    if (href) {
        return (
            <Button
                asChild
                variant="text"
                color="neutral"
                className={`inline-flex items-center gap-2 p-0 underline underline-offset-8 decoration-1 hover:decoration-2 ${className ?? ''}`}
            >
                <Link href={href}>{content}</Link>
            </Button>
        )
    }
    return (
        <Button
            variant="text"
            color="neutral"
            className={`inline-flex items-center gap-2 p-0 underline underline-offset-8 decoration-1 hover:decoration-2 ${className ?? ''}`}
        >
            {content}
        </Button>
    )
}
