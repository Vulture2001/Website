import styles from "@styles/about/ThesisDetailsCard.module.css";


export function ThesisDetailsCard() {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>
                Master’s Thesis
            </h3>

            <dl className={styles.details}>
                <div><dt>Title:</dt><dd>Integrating Social and Ecological Sustainability in Software Product Development</dd></div>
                <div><dt>University:</dt><dd>Technical University of Munich</dd></div>
                <div><dt>Author:</dt><dd>Monika Zielińska</dd></div>
                <div><dt>Advisor:</dt><dd>Elisabeth Freisinger</dd></div>
                <div><dt>Supervisor:</dt><dd>Prof. Dr. Stephan Krusche</dd></div>

            </dl>
            <a href="/files/thesis.pdf" download className={styles.button} >
                Download
            </a>

        </div>
    );
}
