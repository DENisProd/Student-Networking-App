import { Startup } from "@/models/Startup";
import styles from "./StartupCard.module.scss";

export function StartupCard({ title, logo, description, rating }: Startup) {
  return (
    <div className={styles.card}>
      {logo && <img src={logo} alt={title} className={styles.logo} />}
      <div className={styles.info}>
        <h4>{title}</h4>
        <div className={styles.desc}>{description}</div>
        <div className={styles.rating}>★ {rating}</div>
      </div>
    </div>
  );
} 