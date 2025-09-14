"use client";

import thesis from "@/data/thesis.json";

export function ThesisDetailsCard() {
    return (
        <div className="h-full flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm">
            {/* Title */}
            <h3 className="text-xl font-semibold text-fg mb-6">Master’s Thesis</h3>

            {/* Details */}
            <dl className="space-y-3 text-sm sm:text-base text-fg flex-1">
                <div className="flex gap-2">
                    <dt className="font-medium w-32">Title:</dt>
                    <dd className="flex-1">{thesis.title}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="font-medium w-32">University:</dt>
                    <dd className="flex-1">{thesis.university}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="font-medium w-32">School:</dt>
                    <dd className="flex-1">{thesis.school}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="font-medium w-32">Degree:</dt>
                    <dd className="flex-1">{thesis.degree}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="font-medium w-32">Author:</dt>
                    <dd className="flex-1">{thesis.author}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="font-medium w-32">Supervisor:</dt>
                    <dd className="flex-1">{thesis.supervisor}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="font-medium w-32">Advisor:</dt>
                    <dd className="flex-1">{thesis.advisor}</dd>
                </div>
            </dl>

            {/* Button pinned bottom */}
            <div className="mt-6">
                <a
                    href="/files/thesis.pdf"
                    download
                    className="inline-flex px-6 py-2 rounded-full border border-border text-fg font-medium hover:bg-surface-hover transition"
                >
                    Download
                </a>
            </div>
        </div>
    );
}
