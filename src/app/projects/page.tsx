// app/projects/page.tsx
import { getAllProjects } from "@/lib/mdx"; // You’ll need a corresponding function
import Projects from "@components/pages/Projects";

export default function ProjectsPage() {
    const projects = getAllProjects(); // runs only on the server
    return <Projects projects={projects} />;
}
