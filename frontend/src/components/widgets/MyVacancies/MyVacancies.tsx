import { useVacancyStore } from "@/services/store/vacancy.store";
import { VacancyCard } from "@/components/widgets/VacancyCard/VacancyCard";
import Card from "@/components/ui/Card/Card";
import styles from "./MyVacancies.module.scss";

export function MyVacancies() {
  const { vacancies } = useVacancyStore();
  return (
    <Card className={styles.vacanciesBlock}>
      <h3>Мои вакансии</h3>
      <div className={styles.list}>
        {vacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} {...vacancy} />
        ))}
      </div>
    </Card>
  );
} 