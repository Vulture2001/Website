import { GraduationCap, University, FileText } from "lucide-react";

export function ThesisDetailsCard() {
    return (
        <div className="rounded-2xl bg-[hsl(var(--surface)/0.8)] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Master’s Thesis
            </h3>

            <p className="mt-3 text-sm text-[hsl(var(--muted-fg))]">
                <strong>Title:</strong> Integrating Social and Ecological Sustainability
                in Software Product Development
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--muted-fg))]">
                <strong>University:</strong> Technical University of Munich
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--muted-fg))]">
                <strong>Author:</strong> Monika Zielińska
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--muted-fg))]">
                <strong>Advisor:</strong> Elisabeth Freisinger
                <br />
                <strong>Supervisor:</strong> Prof. Dr. Stephan Krusche
            </p>

            {/* Download Thesis */}
            <div className="mt-4">
                <a
                    href="/files/monika-zielinska-thesis.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                    <FileText className="h-4 w-4" />
                    Download Thesis
                </a>
            </div>
        </div>
    );
}
