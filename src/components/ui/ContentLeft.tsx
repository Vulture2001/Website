import React from 'react';
import { Badge } from './Badge';
import { CheckboxItem } from './CheckboxItem';
import { ActionButton } from './ActionButton';
/*
import {EmojiCard} from "@/components/ui/EmojiCard";
*/

export default function Content() {
    return (
        <section className="flex relative flex-col gap-2 justify-center items-center self-stretch px-20 py-24 bg-white max-md:gap-10 max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10">
            <div className="flex relative gap-20 justify-center items-center max-md:flex-col max-md:gap-10">
                <div className="flex relative flex-col gap-10 items-start w-[547px] max-md:w-full max-md:max-w-[600px]">
                    <header className="flex relative flex-col gap-6 items-start self-stretch">
                        <div className="flex relative flex-col gap-4 items-start self-stretch">
                            <Badge>Toolkit</Badge>
                            <h1 className="relative self-stretch text-6xl font-semibold tracking-tighter leading-[63px] text-zinc-800 max-md:text-5xl max-md:leading-[50px] max-sm:text-3xl max-sm:tracking-tighter max-sm:leading-10">
                                Faster and easier tools and templates
                            </h1>
                        </div>
                        <p className="relative self-stretch text-lg leading-8 text-gray-500 max-md:text-base max-md:leading-7 max-sm:text-sm max-sm:leading-6">
                            Designing in Framer has never been so fast and effortless. Browse
                            hundreds of beautifully designed layouts, copy and paste assets
                            and have your project ready in minutes.​
                        </p>
                    </header>

                    <div className="flex relative flex-wrap gap-7 content-start items-start w-[547px] max-md:w-full">
                        <CheckboxItem>12 templates</CheckboxItem>
                    </div>

                    <ActionButton>See Tookit</ActionButton>
                </div>

            </div>
        </section>
    );
}
