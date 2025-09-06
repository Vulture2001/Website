import Image from "next/image";
import { SocialLinks } from "@/components/ui/SocialLinks";
import styles from "@styles/about/ProfileCard.module.css";

export function ProfileCard() {
    return (
        <div className={styles.card}>
            <Image
                src="/png/monika.jpeg"
                alt="Portrait of Monika Zielińska"
                width={112}
                height={112}
                className={styles.avatar}
                priority
            />
            <h3 className={styles.name}>Monika Zielińska</h3>
            <p className={styles.role}>
                Master’s Thesis Author & Framework Developer at Technical University of Munich
            </p>
            <SocialLinks
                links={[
                    { type: "github", url: "https://github.com/monikazielinska0512/software-5.0" },
                    { type: "linkedin", url: "https://www.linkedin.com/in/monika-zieli%C5%84ska0512/" },
                ]}
            />
        </div>
    );
}
