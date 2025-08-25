import React from "react";
import { TeamMember } from "./TeamMember";

const TEAM = [
    {
        name: "Monika Zielińska",
        role: "Masters Thesis Author & Framework Developer",
        avatar:
            "https://api.builder.io/api/v1/image/assets/TEMP/c9063031171b997d3eff2be109286f9cbcc44804?width=75",
        statusColor: "#20C997",
    },
    {
        name: "Lisi",
        role: "Thesis Advisor",
        avatar:
            "https://api.builder.io/api/v1/image/assets/TEMP/3b325f6b5bb49352759c8fe3c84df50113f8b553?width=75",
        statusColor: "#FD7E14",
    },
    {
        name: "Stephan",
        role: "Thesis Supervisor",
        avatar:
            "https://api.builder.io/api/v1/image/assets/TEMP/b513a6ac364625b112024254538ce20b34942261?width=75",
        statusColor: "#9D9FA1",
    },
];

export function TeamCard() {
    return (
        <div
            id="team-card"
            className="flex justify-center items-center w-full md:w-[515px] px-6 md:px-[89px] pt-[51px] pb-[42px] rounded-[40px] bg-gradient-to-b from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.1)]"
        >
            <div className="relative w-full max-w-[336px]">
                {/* layered “depth” cards */}
                <div className="absolute left-[91px] top-5 w-[245px] h-[288px] rounded-[23px] opacity-30 bg-white shadow-[0_4px_43px_0_rgba(0,0,0,0.05)]" />
                <div className="absolute left-[63px] top-[11px] w-[261px] h-[306px] rounded-[23px] opacity-30 bg-white shadow-[0_4px_43px_0_rgba(0,0,0,0.05)]" />

                {/* main card */}
                <div className="relative w-full h-auto rounded-[23px] bg-white shadow-[0_4px_43px_0_rgba(0,0,0,0.05)]">
                    <div className="px-6 pt-5">
                        <h3 className="text-[#282828] font-inter text-[16px] font-semibold leading-[29px]">
                            Thesis Team
                        </h3>
                    </div>
                    <ul className="mt-2">
                        {TEAM.map((m) => (
                            <TeamMember key={m.name} {...m} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
