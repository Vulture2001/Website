'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type CardItemProps = {
    scenario: string;
    description: 'Individual Impact' | 'Social Impact' | 'Environmental Impact';
};

export default function CardItem({ scenario, description }: CardItemProps) {
    const styleMap = {
        'Individual Impact': {
            background: '/svg/CRC_Individual_Text.svg',
            textColor: '#d8e7e1',
        },
        'Social Impact': {
            background: '/svg/CRC_Social_Text.svg',
            textColor: '#3c3a34',
        },
        'Environmental Impact': {
            background: '/svg/CRC_Environmental_Text.svg',
            textColor: '#352c1a',
        },
    } as const;

    const { background, textColor } = styleMap[description];

    const [aspectRatio, setAspectRatio] = useState(1.6);

    useEffect(() => {
        const img = new window.Image();
        img.src = background;
        img.onload = () => setAspectRatio(img.width / img.height);
    }, [background]);

    return (
        <div
            className="relative rounded-4xl shadow-lg border border-gray-300 overflow-hidden flex items-center justify-center text-center"
            style={{
                width: '18rem',
                aspectRatio,
            }}
        >
            <Image
                src={background}
                alt={`${description} background`}
                fill
                className="object-cover absolute inset-0"
                priority
            />

            {/* Text overlay */}
            <div className="relative w-full h-full">
                <span
                    className="font-[700]"
                    style={{
                        position: 'absolute',
                        top: '35%', // fixed vertical offset
                        left: '50%',
                        transform: 'translateX(-50%)', // horizontally center
                        fontFamily: '"Arial Rounded MT Bold", "Arial Rounded", Arial, sans-serif',
                        whiteSpace: 'pre-line',
                        wordWrap: 'break-word',
                        fontSize: '15pt', // <-- updated font size
                        lineHeight: '16pt', // <-- line spacing
                        color: textColor,
                        padding: '2px',
                        width: '85%', // optional: control text width
                        textAlign: 'center',
                    }}
                >
                    {scenario}
                </span>
            </div>
        </div>
    );
}
