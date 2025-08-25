import { Vacancy } from "@/models/Vacancy";
import Card from "@/components/ui/Card/Card";
import Avatar from "@/components/ui/Avatar/Avatar";
import styles from "./VacancyCard.module.scss";

export function VacancyCard({ title, company, logo, shortDescription }: Vacancy) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        {logo && <Avatar src={logo} size={32} />}
        <div className={styles.company}>{company}</div>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.desc}>{shortDescription}</div>
    </Card>
  );
} 