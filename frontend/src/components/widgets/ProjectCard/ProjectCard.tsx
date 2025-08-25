import { Project } from "@/models/Project";
import Card from "@/components/ui/Card/Card";
import Avatar from "@/components/ui/Avatar/Avatar";
import styles from "./ProjectCard.module.scss";
import Typography from "@/components/ui/Typography/Typography";

export function ProjectCard({ title, description, members }: Project) {
  return (
    <Card className={styles.card}>
      <Typography variant="h4" text={title} className={styles.title} />
      <Typography variant="p" text={description} className={styles.description} />
      <div className={styles.members}>
        <b>Участники:</b>
        {members.map(m => (
          <span key={m.id} className={styles.member}>
            <Avatar src={m.avatar} size={24} /> {m.name}
          </span>
        ))}
      </div>
    </Card>
  );
} 