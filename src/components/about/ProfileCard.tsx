"use client";

import Image from "next/image";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function ProfileCard() {
    return (
        <div className="h-full flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-8 shadow-sm text-center">
            <Image
                src="/png/monika.jpeg"
                alt="Portrait of Monika Zielińska"
                width={120}
                height={120}
                className="rounded-full object-cover mb-6"
                priority
            />
            <div>
                <h3 className="text-xl font-semibold text-fg">Monika Zielińska</h3>
                <p className="text-muted-fg">Master’s Student @ TUM</p>
            </div>
            <div className="mt-6">
                <SocialLinks
                    links={[
                        {
                            type: "github",
                            url: "https://github.com/monikazielinska0512/software-5.0",
                        },
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/monika-zieli%C5%84ska0512/",
                        },
                    ]}
                />
            </div>
        </div>
    );
}
