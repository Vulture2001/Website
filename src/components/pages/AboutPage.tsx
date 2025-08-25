import { Gradient } from "@/components/ui/Gradient";
import {Header} from "@/components/ui/Header";
import { ProfileCard } from "@/components/about/ProfileCard";
import { TeamCard } from "@/components/about/TeamCard";
import "@/styles/about.css";

export default function About() {
    return (
        <div id="about" className="relative flex flex-col min-h-screen bg-white">
            <Gradient
                from="#FF57BC"
                to="#FF358A"
                width="100rem"
                height="60rem"
                opacity={0.5}
                className="left-1/2 -translate-x-1/2 -top-40"
            />
            <Gradient
                from="#B7CFFF"
                to="#8BB3FF"
                width="200rem"
                height="80rem"
                className="left-1/2 -translate-x-1/2 top-0"
            />
            <main className="relative z-10 flex flex-col items-center pb-20 pt-14 gap-14">
                <Header
                    id="about-hero"
                    eyebrow="About"
                    title="This framework emerged from research into how software design decisions can better account for social and environmental impacts."
                    subtitle="As digital products become central to our lives, sustainable approaches become urgent."
                    size="xl"
                    maxWidth="5xl"
                />

                <section
                    id="about-cards"
                    className="grid grid-cols-1 md:grid-cols-[296px_minmax(0,1fr)] items-start gap-8 max-w-[1280px] w-full px-4"
                    aria-label="About cards"
                >
                    <ProfileCard />
                    <TeamCard />
                </section>
            </main>
        </div>
    );
}
