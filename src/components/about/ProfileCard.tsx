import React from "react";

export function ProfileCard() {
    return (
        <div
            id="profile-card"
            className="relative flex flex-col justify-end items-center w-[296px] px-[41px] pt-[108px] pb-[100px] rounded-[40px] bg-gradient-to-b from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.1)]"
            aria-label="Profile"
        >
            <div className="w-[213px] h-[213px] absolute left-[41px] top-[108px]">
                <svg
                    width="214"
                    height="214"
                    viewBox="0 0 214 214"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="profile-svg-title"
                >
                    <title id="profile-svg-title">Profile gradient avatar</title>
                    <circle cx="107" cy="107.39" r="106.5" fill="url(#paint0_linear_profile)" />
                    <circle cx="107.004" cy="106.672" r="80.6818" fill="white" />
                    <circle cx="107.001" cy="107.389" r="68.3704" fill="url(#pattern0_profile)" />
                    <defs>
                        <pattern id="pattern0_profile" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use href="#image0_profile" transform="scale(0.00729927)" />
                        </pattern>
                        <linearGradient id="paint0_linear_profile" x1="107" y1="0.889648" x2="166.357" y2="276" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3485FD" />
                            <stop offset="1" stopColor="#F79AFF" />
                        </linearGradient>
                        <image
                            id="image0_profile"
                            width="137"
                            height="137"
                            href="https://api.builder.io/api/v1/image/assets/TEMP/c9063031171b997d3eff2be109286f9cbcc44804?width=75"
                        />
                    </defs>
                </svg>
            </div>
        </div>
    );
}
