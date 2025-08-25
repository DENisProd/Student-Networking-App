import { useProjectStore } from "@/services/store/project.store";
import { ProjectCard } from "@/components/widgets/ProjectCard/ProjectCard";
import Card from "@/components/ui/Card/Card";
import styles from "./MyProjects.module.scss";

export function MyProjects() {
  const { projects } = useProjectStore();
  return (
    <Card className={styles.projectsBlock}>
      <h3>Мои проекты</h3>
      <div className={styles.list}>
        {projects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </Card>
  );
} 