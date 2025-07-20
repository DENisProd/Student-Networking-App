import { News } from "@/models/News";
import styles from "./NewsCard.module.scss";

export function NewsCard({ title, content, date, startupTitle }: News) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>{title}</h4>
        <span className={styles.date}>{new Date(date).toLocaleDateString()}</span>
      </div>
      <div className={styles.startup}>{startupTitle}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
} 