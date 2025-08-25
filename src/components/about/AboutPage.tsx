import { Gradient } from "@/components/ui/Gradient";
import { Header } from "@/components/ui/Header";
import { ProfileCard } from "@/components/about/ProfileCard";
import { TeamCard } from "@/components/about/TeamCard";

const MOCK_TEAM = [
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
    {
        name: "Amira",
        role: "Research Assistant",
        avatar:
            "https://api.builder.io/api/v1/image/assets/TEMP/88c8704e6a72ac2a9ce9a584707fa3d0d5f89ef1?width=75",
        statusColor: "#4dabf7",
    },
    {
        name: "Kenji",
        role: "Data Analyst",
        avatar:
            "https://api.builder.io/api/v1/image/assets/TEMP/1cabc7b9f94702b37976d65bb4f8f7d5bfb6b3e4?width=75",
        statusColor: "#f59f00",
    },
    {
        name: "Elena",
        role: "UX Designer",
        avatar:
            "https://api.builder.io/api/v1/image/assets/TEMP/0cf2156d5d60abf11f6bc5a25b19cdb4472de671?width=75",
        statusColor: "#ae3ec9",
    },
];

export default function About() {
    return (
        <div
            id="about"
            className="relative isolate flex flex-col min-h-screen bg-white"
        >
            <Gradient
                from="hsl(var(--brand-primary))"
                to="hsl(var(--brand-accent))"
                width="100rem"
                height="60rem"
                opacity={0.5}
                className="left-1/2 -translate-x-1/2 -top-40"
            />
            <Gradient
                from="hsl(var(--brand-accent))"
                to="hsl(var(--brand-primary))"
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
                    <TeamCard title="Thesis Team" team={MOCK_TEAM} />
                </section>
            </main>
        </div>
    );
}
