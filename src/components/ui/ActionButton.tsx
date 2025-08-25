import React from 'react';
import {Button} from "@/components/ui/Button";
import Link from "next/link";

export function ArrowIcon() {
    return (
        <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-icon"
            style={{width: '20px', height: '20px', position: 'relative'}}
        >
            <path
                d="M4.16699 10.5H15.8337"
                stroke="#282828"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.833 15.5L15.833 10.5"
                stroke="#282828"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.833 5.5L15.833 10.5"
                stroke="#282828"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

interface ActionButtonProps {
    children: React.ReactNode;
}

export function ActionButton({ children }: ActionButtonProps) {
    return (

        <Link href="/toolkit">
            <button className="flex relative gap-1 items-center border-b border-solid border-b-zinc-800">
                <div className="flex relative gap-1 items-center">
        <span className="relative text-base font-semibold tracking-normal leading-7 text-zinc-800 max-sm:text-sm">
          {children}
        </span>
                </div>
                <ArrowIcon />
            </button>
        </Link>

    );
}
