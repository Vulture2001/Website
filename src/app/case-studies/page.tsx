// app/case-studies/page.tsx
import { getAllCaseStudies } from "@/lib/mdx";
import CaseStudies from "@components/pages/CaseStudies";


export default function CaseStudiesPage() {
    const caseStudies = getAllCaseStudies(); // runs only on the server
    return <CaseStudies caseStudies={caseStudies} />;
}
