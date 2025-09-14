// app/case-studies/page.tsx
import { getAllCaseStudies } from "@/lib/mdx";
import CaseStudiesClient from "@components/knowledge-base/CaseStudiesClient";


export default function CaseStudiesPage() {
    const caseStudies = getAllCaseStudies(); // runs only on the server

    return <CaseStudiesClient caseStudies={caseStudies} />;
}
