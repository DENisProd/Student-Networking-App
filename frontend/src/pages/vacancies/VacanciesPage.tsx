import { useVacancyStore } from "@/services/store/vacancy.store";
import { VacancyCard } from "@/components/widgets/VacancyCard/VacancyCard";

export default function VacanciesPage() {
  const { vacancies } = useVacancyStore();
  return (
    <div style={{ padding: 24 }}>
      <h2>Все вакансии</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {vacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} {...vacancy} />
        ))}
      </div>
    </div>
  );
} 