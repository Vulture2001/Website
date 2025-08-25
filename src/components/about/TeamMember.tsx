import React from "react";

type Props = {
    name: string;
    role: string;
    avatar: string;
    statusColor?: string; // hex string like #20C997
};

export function TeamMember({ name, role, avatar, statusColor = "#9D9FA1" }: Props) {
    return (
        <li className="flex h-[64px] px-[21px] items-center border-b border-[#F0F2F4] last:border-b-0">
            <div className="flex items-center gap-[11px]">
                <div className="relative">
                    <img
                        src={avatar}
                        alt={`${name} avatar`}
                        className="w-[37px] h-[37px] rounded-full border border-white"
                    />
                    <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 block w-[7px] h-[7px] rounded-full border border-white"
                        style={{ backgroundColor: statusColor }}
                    />
                </div>
                <div className="flex flex-col">
          <span className="text-[#282828] font-inter text-[12px] font-bold leading-[19px]">
            {name}
          </span>
                    <span className="text-[#B5B5B5] font-inter text-[10px] leading-[19px]">
            {role}
          </span>
                </div>
            </div>
        </li>
    );
}
