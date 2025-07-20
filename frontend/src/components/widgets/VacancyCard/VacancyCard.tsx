import { Vacancy } from "@/models/Vacancy";
import styles from "./VacancyCard.module.scss";

export function VacancyCard({ title, company, logo, shortDescription }: Vacancy) {
  return (
    <div className={styles.card}>
      {logo && <img src={logo} alt={company} className={styles.logo} />}
      <div className={styles.info}>
        <h4>{title}</h4>
        <div className={styles.company}>{company}</div>
        <div className={styles.desc}>{shortDescription}</div>
      </div>
    </div>
  );
} 