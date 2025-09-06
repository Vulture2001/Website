import Image from "next/image";
import React from "react";

export function FigmaIcon() {
    return (
        <Image
            src="/icons/figma-logo.svg"
            alt="Figma Logo"
            width={20}
            height={20}
            aria-hidden="true"
        />
    );
}
