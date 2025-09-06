import Header from "@/components/ui/layout/Header";
import { ProfileCard } from "@/components/about/ProfileCard";
import { ThesisDetailsCard } from "@/components/about/ThesisDetailsCard";
import styles from "@styles/about/AboutPage.module.css";


export default function AboutPage() {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <Header
                    id="kb-articles"
                    align="center"
                    className="mb-16 mt-20"
                    maxWidth="4xl"
                    title="About the Framework"
                    subtitle="Learn who created Software 5.0 and the research behind its development."
                />

                <div className={styles.grid}>
                    <ProfileCard />
                    <ThesisDetailsCard />
                </div>
            </div>
        </div>
    );
}
