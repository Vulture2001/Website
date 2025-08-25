'use client'

import React from 'react'
import { TeamMember } from './TeamMember'

export type Member = {
    name: string
    role: string
    avatar: string
    statusColor: string
}

export type TeamCardProps = {
    title?: string
    team: Member[]
}

function swallow<T extends React.SyntheticEvent>(fn?: () => void) {
    return (e: T) => {
        e.preventDefault()
        e.stopPropagation()
        ;(e.nativeEvent as any).stopImmediatePropagation?.()
        fn?.()
    }
}

export function TeamCard({ title = 'Thesis Team', team }: TeamCardProps) {
    return (
        <div
            className="
        flex justify-center items-center w-full md:w-[515px]
        px-6 md:px-[89px] pt-[51px] pb-[42px]
        rounded-[40px]
        bg-gradient-to-b from-[rgba(255,255,255,0.40)] to-[rgba(255,255,255,0.10)]
        backdrop-blur
      "
        >
            <div className="relative w-full max-w-[336px]">
                {/* layered depth cards */}

                {/* main card */}
                <div className="relative w-full rounded-[23px] bg-white shadow-[0_4px_43px_0_rgba(0,0,0,0.05)]">
                    <div className="px-6 pt-5">
                        <h3 className="text-[#282828] font-inter text-[16px] font-semibold leading-[29px]">
                            {title}
                        </h3>
                    </div>
                    <ul className="mt-2">
                        {team.map((m) => (
                            <TeamMember key={`${title}-${m.name}`} {...m} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
