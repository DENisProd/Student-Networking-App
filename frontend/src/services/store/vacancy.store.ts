import { create } from "zustand";
import { Vacancy } from "@/models/Vacancy";

interface VacancyStore {
  vacancies: Vacancy[];
  fetchVacancies: () => void;
}

export const useVacancyStore = create<VacancyStore>((set) => ({
  vacancies: [
    { id: 1, title: "Frontend Developer", company: "TechStars", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", shortDescription: "React/TypeScript, удалёнка" },
    { id: 2, title: "Product Manager", company: "Unicorns", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", shortDescription: "Опыт в стартапах, офис" },
    { id: 3, title: "UI/UX Designer", company: "DesignPro", shortDescription: "Figma, креативность" },
  ],
  fetchVacancies: () => {},
})); 