'use client';

import React from 'react';

type CardItemProps = {
    scenario: string;
};

export default function CardItem({ scenario }: CardItemProps) {
    const background = '/svg/green.svg';

    return (
        <div className="relative w-64 h-40 rounded-xl shadow-lg border border-gray-300 flex items-center justify-center text-center p-4 overflow-hidden">
            <img
                src={background}
                alt="Card background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="relative text-black font-medium text-sm leading-snug px-2">
                {scenario}
            </span>
        </div>
    );
}
