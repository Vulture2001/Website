import Image from "next/image";
import React from "react";

export function MiroIcon() {
    return (
        <Image
            src="/miro-logo.svg"
            alt="Miro Logo"
            width={20}
            height={20}
            aria-hidden="true"
        />
    );
}