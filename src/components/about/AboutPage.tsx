import Header from "@/components/ui/Header";

export default function AboutPage() {
    return (
        <div className="relative isolate bg-[hsl(var(--surface))] py-24 px-6 md:px-12 lg:px-20">
            <div className="mx-auto max-w-6xl">
                <Header
                    id="kb-articles"
                    align="center"
                    className="mb-16"
                    maxWidth="4xl"
                    title="About the Framework"
                    subtitle="Learn who created Software 5.0 and the research behind its development."
                />

                {/* Grid layout */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr]">

                    {/* Profile */}
                    <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-8">
                        <div className="flex flex-col items-center text-center">
                            <img
                                src="/png/monika.jpeg"
                                alt="Monika Zielińska"
                                className="h-56 w-56 rounded-full object-cover mb-6 shadow-sm"
                            />
                            <h2 className="text-xl font-semibold text-fg">
                                Monika Zielińska
                            </h2>
                            <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                                Master’s Thesis Author <br />
                                Technical University of Munich
                            </p>

                            {/* Links */}
                            <div className="mt-6 flex gap-6">
                                <a
                                    href="https://github.com/yourname"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground hover:text-fg transition-colors"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://linkedin.com/in/yourname"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground hover:text-fg transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Thesis details */}
                    <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-12 shadow-md">
                        <h3 className="text-lg font-semibold text-fg mb-6">
                            Master’s Thesis
                        </h3>
                        <dl className="space-y-4 text-base text-muted-foreground">
                            <div>
                                <dt className="font-medium text-fg">Title:</dt>
                                <dd>
                                    Integrating Social and Ecological Sustainability in Software Product Development
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-fg">University:</dt>
                                <dd>Technical University of Munich</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-fg">Author:</dt>
                                <dd>Monika Zielińska</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-fg">Advisor:</dt>
                                <dd>Elisabeth Freisinger</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-fg">Supervisor:</dt>
                                <dd>Prof. Dr. Stephan Krusche</dd>
                            </div>
                        </dl>

                        {/* Download button */}
                        <a
                            href="src/files/thesis.pdf"
                            download
                            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                        >
                            Download Thesis
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
