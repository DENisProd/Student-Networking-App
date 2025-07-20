import { useProjectStore } from "@/services/store/project.store";
import styles from "./MyProjects.module.scss";

export function MyProjects() {
  const { projects } = useProjectStore();

  return (
    <div className={styles.projectsBlock}>
      <h3>Мои проекты</h3>
      <div className={styles.list}>
        {projects.map(project => (
          <div key={project.id} className={styles.projectCard}>
            <h4>{project.title}</h4>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.members}>
              <b>Участники:</b>
              {project.members.map(m => (
                <span key={m.id} className={styles.member}>{m.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 