import { Gradient } from "@/components/ui/Gradient";
import Header from "@/components/ui/Header";
import { ProfileCard } from "@/components/about/ProfileCard";
import { WhiteCard } from "@/components/ui/WhiteCard";

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

export default function About() {
    return (
        <div
            id="about"
            className="relative isolate flex flex-col min-h-screen bg-white"
        >
            {/* background gradients */}
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
                    align="center"
                    size="xl"
                    maxWidth="5xl"
                    title="About the Framework"
                    subtitle="Learn who created Software 5.0 and the team behind its development and research."
                />

                <section
                    id="about-cards"
                    className="grid grid-cols-1 md:grid-cols-[296px_minmax(0,1fr)] items-start gap-8 max-w-[1280px] w-full px-4"
                    aria-label="About section"
                >
                    {/* left column: profile */}
                    <ProfileCard />

                    {/* right column: team */}
                    <WhiteCard>
                        <h3 className="text-[#282828] font-semibold text-lg mb-4">
                            Thesis Team
                        </h3>
                        <ul className="space-y-4">
                            {TEAM.map((member) => (
                                <li key={member.name} className="flex items-center gap-3">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {member.role}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </WhiteCard>
                </section>
            </main>
        </div>
    );
}
